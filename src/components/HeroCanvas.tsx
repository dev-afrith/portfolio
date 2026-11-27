"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

function detectSoftwareWebGL(): boolean {
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") || probe.getContext("webgl");
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || "");
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createGlowSpriteTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.28, "rgba(243, 207, 155, 0.72)");
    grad.addColorStop(0.65, "rgba(232, 183, 124, 0.16)");
    grad.addColorStop(1, "rgba(232, 183, 124, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function seededRand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const isSoftwareGl = detectSoftwareWebGL();
    const isMobile = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: isSoftwareGl ? "low-power" : "high-performance",
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.75)
    );
    renderer.setClearColor(0x000000, 0);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.055);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 60);
    camera.position.set(0, 0, isMobile ? 9.5 : 8.2);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmrem.dispose();

    // Three-point studio lighting with warm/cool contrast
    const hemiLight = new THREE.HemisphereLight(0x8fb8f0, 0x16120c, 0.55);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xf3cf9b, 2.3);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xe8b77c, 4.5, 18, 1.6);
    rimLight.position.set(-4.2, -2.5, 2.5);
    scene.add(rimLight);

    const coolAccent = new THREE.PointLight(0x788cff, 2.2, 16, 1.6);
    coolAccent.position.set(4.5, 3.2, -2.5);
    scene.add(coolAccent);

    // Composite 3D architectural gyroscopic sculpture
    const sculptureGroup = new THREE.Group();
    sculptureGroup.position.set(0, 0.1, -1.6);
    const baseScale = isMobile ? 0.85 : 1.15;
    sculptureGroup.scale.setScalar(baseScale);
    scene.add(sculptureGroup);

    // Core faceted obsidian crystal + champagne wireframe cage
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x121114,
      metalness: 0.78,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    const edgeGeo = new THREE.EdgesGeometry(coreGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xe8b77c,
      transparent: true,
      opacity: 0.36,
    });
    const coreEdges = new THREE.LineSegments(edgeGeo, edgeMat);
    coreEdges.scale.setScalar(1.015);
    sculptureGroup.add(coreEdges);

    // Inner glowing nucleus
    const nucleusGeo = new THREE.OctahedronGeometry(0.42, 0);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0xf3cf9b,
      emissive: 0xe8b77c,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.15,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    sculptureGroup.add(nucleusMesh);

    // Orbital ring 1 (Outer brushed champagne gold)
    const ring1Geo = new THREE.TorusGeometry(2.55, 0.014, 16, 140);
    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: 0xe8b77c,
      metalness: 0.94,
      roughness: 0.2,
      envMapIntensity: 1.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, goldMetalMat);
    ring1.rotation.set(Math.PI * 0.36, Math.PI * 0.18, 0);
    sculptureGroup.add(ring1);

    // Orbital ring 2 (Mid cool titanium)
    const ring2Geo = new THREE.TorusGeometry(2.02, 0.011, 16, 120);
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x9aa4b8,
      metalness: 0.88,
      roughness: 0.28,
      envMapIntensity: 1.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, titaniumMat);
    ring2.rotation.set(-Math.PI * 0.28, Math.PI * 0.4, Math.PI * 0.12);
    sculptureGroup.add(ring2);

    // Orbital ring 3 (Inner fine glowing rim)
    const ring3Geo = new THREE.TorusGeometry(1.52, 0.009, 12, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xf3cf9b,
      emissive: 0xe8b77c,
      emissiveIntensity: 0.32,
      metalness: 0.9,
      roughness: 0.18,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.set(Math.PI * 0.15, -Math.PI * 0.32, Math.PI * 0.25);
    sculptureGroup.add(ring3);

    // Orbiting metallic satellite nodes
    const nodeGeo = new THREE.SphereGeometry(0.042, 16, 16);
    const nodeOrbiters: Array<{
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      phase: number;
      tiltX: number;
      tiltZ: number;
    }> = [];

    const nodeConfigs = [
      { radius: 2.55, speed: 0.35, phase: 0.4, tiltX: Math.PI * 0.36, tiltZ: Math.PI * 0.18 },
      { radius: 2.55, speed: 0.35, phase: Math.PI + 0.4, tiltX: Math.PI * 0.36, tiltZ: Math.PI * 0.18 },
      { radius: 2.02, speed: -0.45, phase: 1.2, tiltX: -Math.PI * 0.28, tiltZ: Math.PI * 0.12 },
      { radius: 1.52, speed: 0.58, phase: 2.5, tiltX: Math.PI * 0.15, tiltZ: Math.PI * 0.25 },
    ];

    for (const cfg of nodeConfigs) {
      const nodeMesh = new THREE.Mesh(nodeGeo, ring3Mat);
      sculptureGroup.add(nodeMesh);
      nodeOrbiters.push({ mesh: nodeMesh, ...cfg });
    }

    // Soft radial bokeh particle field (warm gold + cool silver)
    const spriteTex = createGlowSpriteTexture();
    const warmCount = isMobile ? 220 : 420;
    const coolCount = isMobile ? 90 : 180;

    const buildParticleLayer = (
      count: number,
      seedOffset: number,
      colorHex: number,
      size: number,
      opacity: number
    ) => {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (seededRand(i + seedOffset) - 0.5) * 18;
        positions[i * 3 + 1] = (seededRand(i + seedOffset + 900) - 0.5) * 11;
        positions[i * 3 + 2] = (seededRand(i + seedOffset + 1800) - 0.5) * 10 - 2;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        size,
        color: colorHex,
        map: spriteTex,
        transparent: true,
        opacity,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      return { points: new THREE.Points(geo, mat), geo, mat };
    };

    const warmLayer = buildParticleLayer(warmCount, 1, 0xe8b77c, 0.11, 0.65);
    const coolLayer = buildParticleLayer(coolCount, 5000, 0x8fb8f0, 0.085, 0.42);
    scene.add(warmLayer.points);
    scene.add(coolLayer.points);

    // Pre-allocated math helpers outside render loop
    const pointerTarget = { x: 0, y: 0 };
    const pointerSmooth = { x: 0, y: 0 };
    let lastTime = performance.now();
    let elapsed = 0;
    let frameId = 0;
    let isDisposed = false;
    let isInView = true;
    let contextLost = false;

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = -(e.clientY / Math.max(1, window.innerHeight)) * 2 + 1;
      pointerTarget.x = nx;
      pointerTarget.y = ny;
    };

    const onResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
    };

    const onContextRestored = () => {
      contextLost = false;
      lastTime = performance.now();
      scheduleNext();
    };

    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        const wasVisible = isInView;
        isInView = visible;
        if (visible && !wasVisible && !isDisposed && !contextLost && !document.hidden) {
          lastTime = performance.now();
          scheduleNext();
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    const onVisibility = () => {
      if (!document.hidden && isInView && !isDisposed && !contextLost) {
        lastTime = performance.now();
        scheduleNext();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (typeof gl.fenceSync === "function") {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (isDisposed || contextLost) {
            if (sync) gl.deleteSync(sync);
            return;
          }
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function scheduleNext() {
      if (isDisposed || contextLost || !isInView || document.hidden) return;
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    function tick() {
      if (isDisposed || contextLost || !isInView || document.hidden) return;
      const now = performance.now();
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      elapsed += dt;

      // Exponential pointer damping
      pointerSmooth.x = THREE.MathUtils.damp(pointerSmooth.x, pointerTarget.x, 4.5, dt);
      pointerSmooth.y = THREE.MathUtils.damp(pointerSmooth.y, pointerTarget.y, 4.5, dt);

      // Gentle architectural kinetic motion
      sculptureGroup.position.y = 0.1 + Math.sin(elapsed * 0.7) * 0.14;
      sculptureGroup.rotation.y = elapsed * 0.12 + pointerSmooth.x * 0.32;
      sculptureGroup.rotation.x = Math.sin(elapsed * 0.35) * 0.08 - pointerSmooth.y * 0.22;

      coreMesh.rotation.y = -elapsed * 0.16;
      coreMesh.rotation.x = elapsed * 0.1;
      coreEdges.rotation.copy(coreMesh.rotation);
      nucleusMesh.rotation.y = elapsed * 0.42;
      nucleusMesh.rotation.z = elapsed * 0.24;

      ring1.rotation.z = elapsed * 0.18;
      ring2.rotation.z = -elapsed * 0.24;
      ring3.rotation.x = Math.PI * 0.15 + Math.sin(elapsed * 0.4) * 0.12;
      ring3.rotation.z = elapsed * 0.34;

      for (let i = 0; i < nodeOrbiters.length; i++) {
        const n = nodeOrbiters[i];
        const a = elapsed * n.speed + n.phase;
        const x = Math.cos(a) * n.radius;
        const y = Math.sin(a) * n.radius;
        // Rotate orbital plane subtly
        const cosX = Math.cos(n.tiltX);
        const sinX = Math.sin(n.tiltX);
        const y1 = y * cosX;
        const z1 = y * sinX;
        n.mesh.position.set(x, y1, z1);
      }

      // Particle field parallax drift
      warmLayer.points.rotation.y = elapsed * 0.025 + pointerSmooth.x * 0.06;
      warmLayer.points.rotation.x = elapsed * 0.012 - pointerSmooth.y * 0.04;
      coolLayer.points.rotation.y = -elapsed * 0.018 + pointerSmooth.x * 0.04;
      coolLayer.points.rotation.x = -elapsed * 0.01 - pointerSmooth.y * 0.03;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Kick off first frame
    if (isSoftwareGl) {
      renderer.render(scene, camera);
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);

      coreGeo.dispose();
      coreMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      goldMetalMat.dispose();
      titaniumMat.dispose();
      ring3Mat.dispose();
      nodeGeo.dispose();
      warmLayer.geo.dispose();
      warmLayer.mat.dispose();
      coolLayer.geo.dispose();
      coolLayer.mat.dispose();
      spriteTex.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="aw-hero-canvas"
      aria-hidden="true"
    />
  );
}
