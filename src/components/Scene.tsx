"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { sceneState } from "@/lib/sceneState";

/**
 * The page's one 3D idea: the swooshes of the Vexoraa V are sound.
 * Dozens of ribbons start nested as the V, then unfold into a waveform
 * field as the visitor scrolls. Everything is computed in the vertex
 * shader, so the CPU only updates a handful of uniforms per frame.
 */

const COMMON = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uIntensity;
  uniform vec2  uHalf;
  uniform float uWaveW;
  uniform float uPx;
  uniform float uSize;
  attribute float aT;
  attribute float aK;
  attribute float aSeed;
  varying float vAlpha;
  varying float vMix;
  #define PI 3.14159265359

  vec3 ribbon(out float alpha) {
    float t = aT;
    float k = aK;
    float u = t * 2.0 - 1.0;
    float au = abs(u);
    float env = sin(PI * t);

    // ── V formation: nested swooshes meeting at one point ──
    float p = mix(1.0, 1.55, k);
    float topY = uHalf.y * (1.0 + 0.3 * k);
    vec3 a;
    a.x = u * uHalf.x * mix(1.0, 0.68, k);
    a.y = -uHalf.y + (topY + uHalf.y) * pow(au, p);
    a.z = (k - 0.5) * 1.3;
    float amp = (0.35 + uIntensity) * env;
    a.y += (sin(au * 10.0 - uTime * 1.3 + k * 6.2831) * 0.07 +
            sin(au * 23.0 + uTime * 2.0 + k * 9.0) * 0.025) * amp;
    a.z += sin(au * 7.0 - uTime + k * 4.0) * 0.2 * amp;

    // ── waveform field: horizontal audio-like bands ──
    vec3 b;
    b.x = u * uWaveW;
    float band = (k - 0.5) * 2.4;
    float e = pow(env, 0.65) * (0.35 + 0.65 * abs(sin(u * 3.0 + k * 2.0 + uTime * 0.28)));
    float wv = sin(u * 6.0 - uTime * 0.9 + k * 3.0) * 0.5 +
               sin(u * 14.0 + uTime * 1.2 + k * 7.0) * 0.3 +
               sin(u * 31.0 - uTime * 2.0 + k * 11.0) * 0.12;
    b.y = band + wv * e * (0.22 + uIntensity * 0.85);
    b.z = sin(u * 4.0 + k * 5.0) * 0.45;

    float m = smoothstep(0.0, 1.0, uMorph);
    alpha = smoothstep(0.0, 0.07, t) * smoothstep(1.0, 0.93, t) *
            (0.22 + 0.78 * (1.0 - abs(k - 0.5) * 1.7));
    return mix(a, b, m);
  }
`;

const LINE_VERT = /* glsl */ `
  ${COMMON}
  void main() {
    float alpha;
    vec3 pos = ribbon(alpha);
    vAlpha = alpha;
    vMix = aK;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const POINT_VERT = /* glsl */ `
  ${COMMON}
  void main() {
    float alpha;
    vec3 pos = ribbon(alpha);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPx * (7.0 / -mv.z) * (0.55 + aSeed * 0.9);
    vAlpha = alpha;
    vMix = aK;
  }
`;

const LINE_FRAG = /* glsl */ `
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vMix;
  void main() {
    vec3 c = mix(uColA, uColB, smoothstep(0.15, 0.95, vMix));
    gl_FragColor = vec4(c, vAlpha * uOpacity * 0.5);
  }
`;

const POINT_FRAG = /* glsl */ `
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.05, d);
    vec3 c = mix(uColA, uColB, smoothstep(0.15, 0.95, vMix));
    gl_FragColor = vec4(c, vAlpha * soft * uOpacity);
  }
`;

export default function Scene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const LINES = small ? 34 : 58;
    const POINTS = small ? 170 : 260;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the page still works on flat colour
    }
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    camera.position.set(0, 0, 7);
    const group = new THREE.Group();
    scene.add(group);

    // ── geometry: LINES ribbons × POINTS samples; positions come from the shader ──
    const count = LINES * POINTS;
    const aT = new Float32Array(count);
    const aK = new Float32Array(count);
    const aSeed = new Float32Array(count);
    const index: number[] = [];
    for (let k = 0; k < LINES; k++) {
      for (let i = 0; i < POINTS; i++) {
        const id = k * POINTS + i;
        aT[id] = i / (POINTS - 1);
        aK[id] = k / (LINES - 1);
        aSeed[id] = Math.random();
        if (i < POINTS - 1) index.push(id, id + 1);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geo.setAttribute("aT", new THREE.BufferAttribute(aT, 1));
    geo.setAttribute("aK", new THREE.BufferAttribute(aK, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    geo.setIndex(index);

    const uniforms = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uIntensity: { value: 0.45 },
      uHalf: { value: new THREE.Vector2(2.7, 1.9) },
      uWaveW: { value: 5 },
      uPx: { value: 1 },
      uSize: { value: 2.4 },
      uOpacity: { value: 1 },
      uColA: { value: new THREE.Color("#f4f3f0") },
      uColB: { value: new THREE.Color("#6f83ff") },
    };

    const common = {
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    };
    const lineMat = new THREE.ShaderMaterial({ ...common, vertexShader: LINE_VERT, fragmentShader: LINE_FRAG });
    const pointMat = new THREE.ShaderMaterial({ ...common, vertexShader: POINT_VERT, fragmentShader: POINT_FRAG });
    const lines = new THREE.LineSegments(geo, lineMat);
    const points = new THREE.Points(geo, pointMat);
    lines.frustumCulled = false;
    points.frustumCulled = false;
    group.add(lines, points);

    let visW = 9;
    let visH = 5;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      visW = visH * camera.aspect;
      const portrait = camera.aspect < 1;
      const hw = portrait ? visW * 0.44 : Math.min(visW * 0.22, 2.5);
      const hh = portrait ? Math.min(visH * 0.15, hw * 1.3) : Math.min(visH * 0.23, 1.25);
      uniforms.uHalf.value.set(hw, hh);
      uniforms.uWaveW.value = visW * 0.58;
      uniforms.uPx.value = dpr;
      uniforms.uSize.value = portrait ? 2.6 : 2.3;
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

    // fade the whole formation in once the preloader lifts
    uniforms.uOpacity.value = 0;
    let fade = 0;

    const clock = new THREE.Clock();
    let time = 0;
    const lerp = THREE.MathUtils.lerp;
    const loop = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const speed = reduce ? 0.12 : 1 + Math.min(Math.abs(sceneState.vel) * 0.0035, 2.2);
      time += dt * speed * 0.8;
      fade = Math.min(1, fade + dt * 0.7);

      mouse.x = lerp(mouse.x, mouse.tx, 0.05);
      mouse.y = lerp(mouse.y, mouse.ty, 0.05);

      uniforms.uTime.value = time;
      uniforms.uMorph.value = sceneState.morph;
      uniforms.uIntensity.value = lerp(uniforms.uIntensity.value, sceneState.intensity, 0.06);
      uniforms.uOpacity.value = lerp(uniforms.uOpacity.value, sceneState.opacity * fade, 0.1);

      group.position.x = sceneState.x * visW;
      group.position.y = sceneState.y * visH;
      group.scale.setScalar(sceneState.zoom);
      group.rotation.y = mouse.x * 0.32 + sceneState.spin;
      group.rotation.x = -mouse.y * 0.16;
      group.rotation.z = Math.sin(time * 0.15) * 0.02;

      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(loop);

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      lineMat.dispose();
      pointMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
