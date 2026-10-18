"use client";

import dynamic from "next/dynamic";

// Three.js is ~600KB: load it after first paint, never on the server.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function SceneMount() {
  return <Scene />;
}
