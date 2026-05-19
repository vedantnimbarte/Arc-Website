"use client";

import { useState } from "react";

export default function DocSearch() {
  const [v, setV] = useState("");
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] focus-within:border-silver-300/40">
      <span className="text-silver-500">⌕</span>
      <input
        type="text"
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Search the docs…"
        className="flex-1 bg-transparent text-[13.5px] text-silver-100 placeholder-silver-600 outline-none"
      />
      <span className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
        ⌘K
      </span>
    </div>
  );
}
