/**
 * Single source of truth for what ARC actually is and ships.
 * Every fact here is checked against the repo at vedantnimbarte/Arc.
 * When you cut a release, update VERSION and RELEASED — nothing else.
 */

export const REPO = "https://github.com/vedantnimbarte/Arc";
export const VERSION = "0.3.0";
export const RELEASED = "2026-09-01";
export const RELEASE_URL = `${REPO}/releases/tag/v${VERSION}`;
export const DOWNLOAD_BASE = `${REPO}/releases/download/v${VERSION}`;

/** Real assets attached to the v0.3.0 release. Sizes from the GitHub API. */
export type Build = {
  file: string;
  label: string;
  size: string;
  arch: string;
};

export const BUILDS: Record<"mac" | "windows" | "linux", Build[]> = {
  mac: [
    { file: "ARC_0.3.0_aarch64.dmg", label: "Disk image", size: "16.3 MB", arch: "Apple Silicon" },
    { file: "ARC_aarch64.app.tar.gz", label: "App bundle", size: "14.6 MB", arch: "Apple Silicon" },
  ],
  windows: [
    { file: "ARC_0.3.0_x64-setup.exe", label: "Installer", size: "10.7 MB", arch: "x86_64" },
    { file: "ARC_0.3.0_x64_en-US.msi", label: "MSI package", size: "14.3 MB", arch: "x86_64" },
  ],
  linux: [
    { file: "ARC_0.3.0_amd64.AppImage", label: "AppImage", size: "87.8 MB", arch: "x86_64" },
    { file: "ARC_0.3.0_amd64.deb", label: "Debian package", size: "14.9 MB", arch: "x86_64" },
    { file: "ARC-0.3.0-1.x86_64.rpm", label: "RPM package", size: "14.9 MB", arch: "x86_64" },
  ],
};

export const REQUIREMENTS = {
  mac: "macOS 12 or later",
  windows: "Windows 10 or later · WebView2",
  linux: "gtk3 · WebKit2GTK",
};

/** Rust crates behind the app — the actual workspace under rust/. */
export const CRATES = [
  { name: "arc-pty", does: "PTY spawn, resize, kill", built: "portable-pty · tokio" },
  { name: "arc-filesystem", does: "File ops, watching, BM25 index", built: "notify · tantivy" },
  { name: "arc-git", does: "Git introspection", built: "git" },
  { name: "arc-git-host", does: "GitHub pull requests", built: "REST" },
  { name: "arc-session-manager", does: "Workspaces, tabs, history", built: "sqlx · SQLite" },
  { name: "arc-ssh", does: "SSH client and SFTP mounts", built: "russh · russh-sftp" },
  { name: "arc-lsp", does: "Language server client", built: "stdio JSON-RPC" },
  { name: "arc-http-client", does: "REST client engine", built: "hyper" },
  { name: "arc-db", does: "Postgres, MySQL, SQLite queries", built: "sqlx" },
  { name: "arc-wingman", does: "Wingman daemon client", built: "HTTP · SSE" },
];
