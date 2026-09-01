"use client";

/**
 * The exploded workspace.
 *
 * ARC's pitch is that four tools live in one window. So the hero starts with
 * those four panels pulled apart in space and reassembles them into the app
 * as you scroll. The slabs are real lit geometry; the panel faces are ARC's
 * actual UI rendered as DOM on top, so the type stays crisp at any zoom.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, Lightformer, RoundedBox } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

import { EditorPanel, FileTreePanel, SourcePanel, TerminalPanel } from "./workspace/Panels";

/* Panel geometry in world units. Assembled positions tile into one window
   6.4 wide by 4.0 tall; exploded positions pull them apart in x, y and z. */
type Slab = {
  id: string;
  w: number;
  h: number;
  assembled: [number, number, number];
  exploded: [number, number, number];
  spin: [number, number, number];
  px: number;
  Panel: () => JSX.Element;
};

const SLABS: Slab[] = [
  {
    id: "tree",
    w: 1.4,
    h: 4.0,
    assembled: [-2.5, 0, 0],
    exploded: [-3.15, 0.35, 1.05],
    spin: [0.05, 0.34, 0.02],
    px: 210,
    Panel: FileTreePanel,
  },
  {
    id: "editor",
    w: 3.4,
    h: 2.5,
    assembled: [-0.1, 0.75, 0],
    exploded: [-1.55, -1.35, -1.7],
    spin: [-0.05, 0.06, -0.012],
    px: 510,
    Panel: EditorPanel,
  },
  {
    id: "terminal",
    w: 3.4,
    h: 1.5,
    assembled: [-0.1, -1.25, 0],
    exploded: [1.55, -1.05, 0.5],
    spin: [0.07, -0.1, 0.018],
    px: 510,
    Panel: TerminalPanel,
  },
  {
    id: "source",
    w: 1.6,
    h: 4.0,
    assembled: [2.4, 0, 0],
    exploded: [3.25, 0.5, -0.75],
    spin: [0.04, -0.3, -0.02],
    px: 240,
    Panel: SourcePanel,
  },
];

const lerp = THREE.MathUtils.lerp;

/* drei's <Html transform> lays the DOM out in its own CSS3D space whose unit
   is not the world unit. This is the measured ratio between the two; it is a
   constant of the renderer, not of the camera or the viewport. */
const HTML_UNIT = 31.6;

function Panel({ slab, progress }: { slab: Slab; progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    // p: 0 = pulled apart, 1 = assembled into one window
    const p = progress.current;
    const [ax, ay, az] = slab.assembled;
    const [ex, ey, ez] = slab.exploded;

    // Drift only while apart — the assembled window sits still.
    const t = clock.elapsedTime;
    const float = (1 - p) * 0.055;
    const bobY = Math.sin(t * 0.42 + phase) * float * 2.2;
    const bobZ = Math.cos(t * 0.33 + phase) * float * 1.6;

    g.position.x = lerp(ex, ax, p);
    g.position.y = lerp(ey, ay, p) + bobY;
    g.position.z = lerp(ez, az, p) + bobZ;

    const [rx, ry, rz] = slab.spin;
    g.rotation.x = lerp(rx, 0, p) + Math.sin(t * 0.29 + phase) * float * 0.35;
    g.rotation.y = lerp(ry, 0, p) + Math.cos(t * 0.24 + phase) * float * 0.5;
    g.rotation.z = lerp(rz, 0, p);
  });

  const { Panel: Face } = slab;

  return (
    <group ref={group}>
      {/* The lit slab the panel sits on — this is what catches the key light. */}
      <RoundedBox args={[slab.w, slab.h, 0.055]} radius={0.028} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#1e1e23"
          roughness={0.38}
          metalness={0.35}
          clearcoat={0.5}
          clearcoatRoughness={0.28}
        />
      </RoundedBox>

      {/* ARC's real UI, mapped onto the face. */}
      <Html
        transform
        occlude={false}
        position={[0, 0, 0.031]}
        scale={(slab.w / slab.px) * HTML_UNIT}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{ width: slab.px, height: Math.round(slab.px * (slab.h / slab.w)) }}
          aria-hidden="true"
        >
          <Face />
        </div>
      </Html>
    </group>
  );
}

function Rig({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  // The fan is wider than the assembled window, so the fit tracks it.
  const fitApart = Math.min(1, (viewport.width * 0.96) / 8.4);
  const fitTogether = Math.min(1, (viewport.width * 0.94) / 6.9);

  useFrame(({ pointer: p }, delta) => {
    const g = group.current;
    if (!g) return;
    // Parallax is off on touch-sized viewports where there is no cursor.
    const strength = size.width < 768 ? 0 : 1;
    pointer.current.x = lerp(pointer.current.x, p.x * strength, Math.min(1, delta * 2.4));
    pointer.current.y = lerp(pointer.current.y, p.y * strength, Math.min(1, delta * 2.4));

    const settle = 1 - progress.current * 0.55;
    g.rotation.y = pointer.current.x * 0.13 * settle;
    g.rotation.x = -pointer.current.y * 0.08 * settle;
    // Narrow viewports stack more copy above, so the cluster sits lower.
    const rest = size.width < 640 ? -1.75 : -1.0;
    g.position.y = rest + progress.current * 0.45;
    g.scale.setScalar(lerp(fitApart, fitTogether, progress.current));
  });

  return (
    <group ref={group}>
      {SLABS.map((s) => (
        <Panel key={s.id} slab={s} progress={progress} />
      ))}
    </group>
  );
}

export default function HeroScene({
  progress,
  active,
}: {
  progress: React.MutableRefObject<number>;
  active: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7.6], fov: 42 }}
      style={{ pointerEvents: "none" }}
      /* R3F's default measurement never resolves a size inside a sticky
         ancestor, which leaves the canvas mounted but never rendered. */
      resize={{ scroll: false, debounce: 0 }}
      /* Nothing to draw once the stage has scrolled away. */
      frameloop={active ? "always" : "never"}
    >
      {/* Key from the upper left, matching the light baked into .surface. */}
      <ambientLight intensity={1.05} />
      <directionalLight position={[-4, 6, 5]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[6, -2, 3]} intensity={0.9} color="#9aa4b8" />

      {/* Outside Suspense on purpose: the panels must render even if the
          environment map never resolves. */}
      <Rig progress={progress} />

      {/* Reflections come from shaped lights, not a downloaded HDRI —
          nothing on this page reaches the network for an asset. */}
      <Suspense fallback={null}>
        <Environment resolution={128} frames={1}>
          <Lightformer intensity={2.6} position={[-4, 3, 4]} scale={[8, 8, 1]} color="#ffffff" />
          <Lightformer intensity={0.8} position={[4, -2, 2]} scale={[6, 6, 1]} color="#8f97ab" />
          <Lightformer intensity={1.2} form="ring" position={[0, 4, -4]} scale={[10, 10, 1]} color="#dfe3ea" />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
