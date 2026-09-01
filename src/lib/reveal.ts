"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element first crosses into view. Pair with the
 * `.reveal` class in globals.css — the element sits translated and
 * transparent until `shown` flips, then eases into place.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(margin = "-12%") {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin: `0px 0px ${margin} 0px` }
    );
    obs.observe(el);

    // Content must never be stranded invisible because an observer was slow
    // or never fired. Past this point the animation is not worth the risk.
    const failsafe = window.setTimeout(() => {
      setShown(true);
      obs.disconnect();
    }, 1600);

    return () => {
      window.clearTimeout(failsafe);
      obs.disconnect();
    };
  }, [margin]);

  return { ref, shown };
}

/** Normalised 0→1 progress of an element travelling through the viewport. */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return setProgress(rect.top < 0 ? 1 : 0);
      setProgress(Math.max(0, Math.min(1, -rect.top / span)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}

/** True when the visitor has asked for less motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
