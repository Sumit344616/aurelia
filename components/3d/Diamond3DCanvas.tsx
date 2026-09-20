"use client";

import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

export type GemCut = "emerald" | "brilliant" | "cushion";
export type GemColor = "diamond" | "emerald" | "ruby" | "sapphire";
export type RingAlloy = "platinum" | "champagne" | "rose";
export type ViewAngle = "front" | "table" | "profile" | "culet" | "auto";

interface Diamond3DCanvasProps {
  scrollProgress?: number; // 0 to 1
  cut?: GemCut;
  color?: GemColor;
  alloy?: RingAlloy;
  caratScale?: number;
  showMounting?: boolean;
  autoRotate?: boolean;
  className?: string;
  onAngleChange?: (angleName: string) => void;
}

export default function Diamond3DCanvas({
  scrollProgress = 0,
  cut = "emerald",
  color = "diamond",
  alloy = "platinum",
  caratScale = 1.0,
  showMounting = true,
  autoRotate = true,
  className = "",
  onAngleChange,
}: Diamond3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const gemMeshRef = useRef<THREE.Mesh | null>(null);
  const mountingGroupRef = useRef<THREE.Group | null>(null);
  const platMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const keyLightRef = useRef<THREE.PointLight | null>(null);

  // User manual drag & rotation state
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const manualRotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.18, y: 0, z: 0 });
  const currentRotationRef = useRef({ x: 0.18, y: 0, z: 0 });
  const baseScaleRef = useRef(caratScale * 0.76);
  const targetScaleRef = useRef(caratScale * 0.76);
  const currentScaleRef = useRef(caratScale * 0.76);

  useEffect(() => {
    baseScaleRef.current = caratScale * 0.76;
    targetScaleRef.current = caratScale * 0.76;
  }, [caratScale]);

  // -------------------------------------------------------------
  // Geometry Generators (Precision Haute Joaillerie Symmetry)
  // Non-indexed BufferGeometry with flat facet normals
  // -------------------------------------------------------------

  // 1. Step-Cut Emerald Cut Geometry (Authentic 57-Facet Polyhedron)
  const createEmeraldCutGeometry = useCallback(() => {
    const geom = new THREE.BufferGeometry();
    const vertices: number[] = [];

    // Helper to generate symmetric octagonal contour
    function makeOctagon(scaleX: number, scaleZ: number, y: number, cornerFactor = 0.26) {
      const cx = scaleX * cornerFactor;
      const cz = scaleZ * cornerFactor;
      return [
        new THREE.Vector3(scaleX - cx, y, scaleZ),
        new THREE.Vector3(scaleX, y, scaleZ - cz),
        new THREE.Vector3(scaleX, y, -scaleZ + cz),
        new THREE.Vector3(scaleX - cx, y, -scaleZ),
        new THREE.Vector3(-scaleX + cx, y, -scaleZ),
        new THREE.Vector3(-scaleX, y, -scaleZ + cz),
        new THREE.Vector3(-scaleX, y, scaleZ - cz),
        new THREE.Vector3(-scaleX + cx, y, scaleZ),
      ];
    }

    const table = makeOctagon(0.68, 0.48, 0.56);
    const crown1 = makeOctagon(0.86, 0.60, 0.38);
    const girdleTop = makeOctagon(1.14, 0.82, 0.16);
    const girdleBottom = makeOctagon(1.14, 0.82, 0.04);
    const pav1 = makeOctagon(0.82, 0.58, -0.42);
    const pav2 = makeOctagon(0.50, 0.34, -0.86);
    const keelP1 = new THREE.Vector3(0.26, -1.25, 0);
    const keelP2 = new THREE.Vector3(-0.26, -1.25, 0);

    function pushTri(p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3) {
      vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
    }

    function pushQuad(p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3, p4: THREE.Vector3) {
      pushTri(p1, p2, p3);
      pushTri(p1, p3, p4);
    }

    // A. Flat Octagon Table Facet (Seamless single plane at y = 0.56)
    const tableCenter = new THREE.Vector3(0, 0.56, 0);
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8;
      pushTri(tableCenter, table[i], table[next]);
    }

    // B. Crown Tier 1 Steps
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8;
      pushQuad(table[i], crown1[i], crown1[next], table[next]);
    }

    // C. Crown Tier 2 Steps
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8;
      pushQuad(crown1[i], girdleTop[i], girdleTop[next], crown1[next]);
    }

    // D. Girdle Facets (Faceted vertical boundary)
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8;
      pushQuad(girdleTop[i], girdleBottom[i], girdleBottom[next], girdleTop[next]);
    }

    // E. Pavilion Tier 1 Steps
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8;
      pushQuad(girdleBottom[i], pav1[i], pav1[next], girdleBottom[next]);
    }

    // F. Pavilion Tier 2 Steps
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8;
      pushQuad(pav1[i], pav2[i], pav2[next], pav1[next]);
    }

    // G. Pavilion Tier 3 Steps to Keel
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8;
      const targetKeel = i < 4 ? keelP1 : keelP2;
      const nextTargetKeel = next < 4 ? keelP1 : keelP2;
      if (targetKeel === nextTargetKeel) {
        pushTri(pav2[i], targetKeel, pav2[next]);
      } else {
        pushTri(pav2[i], targetKeel, pav2[next]);
        pushTri(pav2[next], targetKeel, nextTargetKeel);
      }
    }

    geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  // 2. Round Brilliant Cut Geometry (57 Tolkowsky Facets)
  const createRoundBrilliantGeometry = useCallback(() => {
    const geom = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const segments = 16;
    const tableRadius = 0.66;
    const tableHeight = 0.52;
    const girdleRadius = 1.22;
    const girdleTopY = 0.14;
    const girdleBottomY = 0.04;
    const culetY = -1.35;

    const tableCenter = new THREE.Vector3(0, tableHeight, 0);
    const culet = new THREE.Vector3(0, culetY, 0);

    for (let i = 0; i < segments; i++) {
      const t1 = (i / segments) * Math.PI * 2;
      const t2 = ((i + 1) / segments) * Math.PI * 2;

      const tx1 = Math.cos(t1) * tableRadius;
      const tz1 = Math.sin(t1) * tableRadius;
      const tx2 = Math.cos(t2) * tableRadius;
      const tz2 = Math.sin(t2) * tableRadius;

      const gx1 = Math.cos(t1) * girdleRadius;
      const gz1 = Math.sin(t1) * girdleRadius;
      const gx2 = Math.cos(t2) * girdleRadius;
      const gz2 = Math.sin(t2) * girdleRadius;

      // Table Triangle
      vertices.push(tableCenter.x, tableCenter.y, tableCenter.z);
      vertices.push(tx1, tableHeight, tz1);
      vertices.push(tx2, tableHeight, tz2);

      // Crown Kite Bezel & Star Facets
      vertices.push(tx1, tableHeight, tz1);
      vertices.push(gx1, girdleTopY, gz1);
      vertices.push(tx2, tableHeight, tz2);

      vertices.push(tx2, tableHeight, tz2);
      vertices.push(gx1, girdleTopY, gz1);
      vertices.push(gx2, girdleTopY, gz2);

      // Girdle Facet
      vertices.push(gx1, girdleTopY, gz1);
      vertices.push(gx1, girdleBottomY, gz1);
      vertices.push(gx2, girdleTopY, gz2);

      vertices.push(gx2, girdleTopY, gz2);
      vertices.push(gx1, girdleBottomY, gz1);
      vertices.push(gx2, girdleBottomY, gz2);

      // Pavilion Mains converging to Culet
      vertices.push(gx1, girdleBottomY, gz1);
      vertices.push(culet.x, culet.y, culet.z);
      vertices.push(gx2, girdleBottomY, gz2);
    }

    geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  // 3. Cushion Cut Geometry (Soft Curved Pillow Outline)
  const createCushionCutGeometry = useCallback(() => {
    const geom = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const segments = 16;
    const tableHeight = 0.54;
    const girdleTopY = 0.15;
    const girdleBottomY = 0.04;
    const culetY = -1.30;

    function cushionPoint(t: number, radius: number) {
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);
      const signX = cosT < 0 ? -1 : 1;
      const signZ = sinT < 0 ? -1 : 1;
      const n = 3.2;
      const x = Math.pow(Math.abs(cosT), 2 / n) * radius * 1.15 * signX;
      const z = Math.pow(Math.abs(sinT), 2 / n) * radius * 0.95 * signZ;
      return { x, z };
    }

    const tableCenter = new THREE.Vector3(0, tableHeight, 0);
    const culet = new THREE.Vector3(0, culetY, 0);

    for (let i = 0; i < segments; i++) {
      const t1 = (i / segments) * Math.PI * 2;
      const t2 = ((i + 1) / segments) * Math.PI * 2;

      const p1 = cushionPoint(t1, 0.65);
      const p2 = cushionPoint(t2, 0.65);
      const g1 = cushionPoint(t1, 1.18);
      const g2 = cushionPoint(t2, 1.18);

      // Table
      vertices.push(tableCenter.x, tableCenter.y, tableCenter.z);
      vertices.push(p1.x, tableHeight, p1.z);
      vertices.push(p2.x, tableHeight, p2.z);

      // Crown Facets
      vertices.push(p1.x, tableHeight, p1.z);
      vertices.push(g1.x, girdleTopY, g1.z);
      vertices.push(p2.x, tableHeight, p2.z);

      vertices.push(p2.x, tableHeight, p2.z);
      vertices.push(g1.x, girdleTopY, g1.z);
      vertices.push(g2.x, girdleTopY, g2.z);

      // Girdle
      vertices.push(g1.x, girdleTopY, g1.z);
      vertices.push(g1.x, girdleBottomY, g1.z);
      vertices.push(g2.x, girdleTopY, g2.z);

      vertices.push(g2.x, girdleTopY, g2.z);
      vertices.push(g1.x, girdleBottomY, g1.z);
      vertices.push(g2.x, girdleBottomY, g2.z);

      // Pavilion
      vertices.push(g1.x, girdleBottomY, g1.z);
      vertices.push(culet.x, culet.y, culet.z);
      vertices.push(g2.x, girdleBottomY, g2.z);
    }

    geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  // -------------------------------------------------------------
  // Sculpted High-Jewellery Solitaire Ring Mount
  // (Curved French Talon Prongs, Under-Bezel Gallery, Cathedral Band)
  // -------------------------------------------------------------
  const createRingMount = useCallback((alloyType: RingAlloy) => {
    const mountGroup = new THREE.Group();

    const alloyColors = {
      platinum: { color: 0xf2f0eb, metalness: 0.98, roughness: 0.06 },
      champagne: { color: 0xd4af64, metalness: 0.96, roughness: 0.08 },
      rose: { color: 0xdf9487, metalness: 0.96, roughness: 0.08 },
    };

    const conf = alloyColors[alloyType] || alloyColors.platinum;

    const metalMat = new THREE.MeshStandardMaterial({
      color: conf.color,
      metalness: conf.metalness,
      roughness: conf.roughness,
    });
    platMatRef.current = metalMat;

    // 1. Four Sculpted Talon Prongs (Curving smoothly from under-gallery up around the stone)
    const prongCorners = [
      { x: 0.88, z: 0.62 },
      { x: -0.88, z: 0.62 },
      { x: 0.88, z: -0.62 },
      { x: -0.88, z: -0.62 },
    ];

    prongCorners.forEach((corner) => {
      // 3-point smooth curved talon spline
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(corner.x * 0.68, -0.42, corner.z * 0.68),
        new THREE.Vector3(corner.x * 1.04, 0.10, corner.z * 1.04),
        new THREE.Vector3(corner.x * 0.94, 0.44, corner.z * 0.94),
        new THREE.Vector3(corner.x * 0.84, 0.58, corner.z * 0.84),
      ]);

      const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.045, 12, false);
      const prongMesh = new THREE.Mesh(tubeGeo, metalMat);
      mountGroup.add(prongMesh);

      // Hand-sculpted talon claw tip gripping the crown
      const tipGeo = new THREE.ConeGeometry(0.046, 0.12, 12);
      const tipMesh = new THREE.Mesh(tipGeo, metalMat);
      tipMesh.position.set(corner.x * 0.84, 0.58, corner.z * 0.84);
      tipMesh.rotation.x = corner.z > 0 ? 0.7 : -0.7;
      tipMesh.rotation.z = corner.x > 0 ? -0.7 : 0.7;
      mountGroup.add(tipMesh);
    });

    // 2. Under-Bezel Wire Gallery Basket
    const bezelTorus = new THREE.Mesh(
      new THREE.TorusGeometry(0.76, 0.038, 16, 40),
      metalMat
    );
    bezelTorus.rotation.x = Math.PI / 2;
    bezelTorus.position.y = -0.42;
    mountGroup.add(bezelTorus);

    // 3. Cathedral Arch Struts (Connecting basket to shank)
    const strutGeo = new THREE.CylinderGeometry(0.035, 0.045, 0.55, 12);
    const strutPositions = [
      { x: 0, y: -0.7, z: 0.65, rotX: 0.25 },
      { x: 0, y: -0.7, z: -0.65, rotX: -0.25 },
    ];
    strutPositions.forEach((sp) => {
      const strut = new THREE.Mesh(strutGeo, metalMat);
      strut.position.set(sp.x, sp.y, sp.z);
      strut.rotation.x = sp.rotX;
      mountGroup.add(strut);
    });

    // 4. Contoured Cathedral Ring Shank (Finger Band)
    const bandTorus = new THREE.Mesh(
      new THREE.TorusGeometry(1.68, 0.096, 24, 64),
      metalMat
    );
    bandTorus.rotation.y = Math.PI / 2;
    bandTorus.position.y = -2.18;
    mountGroup.add(bandTorus);

    // 5. Micro-Pavé Side Diamonds lining the platinum band shoulders
    const paveMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.95,
      ior: 2.417,
      dispersion: 0.05,
      flatShading: true,
    });
    const paveGeo = new THREE.SphereGeometry(0.045, 8, 8);
    for (let i = 0; i < 9; i++) {
      const angle = 0.22 + i * 0.095;
      const y = -2.18 + Math.cos(angle) * 1.68;
      const z = Math.sin(angle) * 1.68;

      const p1 = new THREE.Mesh(paveGeo, paveMat);
      p1.position.set(0, y, z);
      mountGroup.add(p1);

      const p2 = new THREE.Mesh(paveGeo, paveMat);
      p2.position.set(0, y, -z);
      mountGroup.add(p2);
    }

    return mountGroup;
  }, []);

  // -------------------------------------------------------------
  // Studio PMREM Environment Reflection Map
  // -------------------------------------------------------------
  const createStudioEnvironment = useCallback(
    (renderer: THREE.WebGLRenderer) => {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();

      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Deep obsidian background
        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0, "#080807");
        grad.addColorStop(0.5, "#181714");
        grad.addColorStop(1, "#080807");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);

        // Overhead brilliant softbox (white reflection key)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(320, 20, 380, 150);

        // Right warm gold reflection fill
        ctx.fillStyle = "#F5E2B5";
        ctx.fillRect(50, 120, 130, 260);

        // Left crisp ice-blue studio rim
        ctx.fillStyle = "#E0EDF8";
        ctx.fillRect(840, 120, 130, 260);

        // Floor warm amber glow
        ctx.fillStyle = "rgba(198, 161, 91, 0.45)";
        ctx.fillRect(380, 370, 260, 110);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.mapping = THREE.EquirectangularReflectionMapping;
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      pmremGenerator.dispose();
      return envMap;
    },
    []
  );

  // -------------------------------------------------------------
  // Initialize Three.js Scene
  // -------------------------------------------------------------
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0.0, 7.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // Environment Map
    const envMap = createStudioEnvironment(renderer);
    scene.environment = envMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xffffff, 80, 24);
    keyLight.position.set(3.0, 4.0, 6.0);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0xc6a15b, 2.4);
    fillLight.position.set(-3.5, -1.0, 3.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLight.position.set(0, 4.2, -3.0);
    scene.add(rimLight);

    // Main Rotating Group (Positioned to center the full ring in viewport)
    const mainGroup = new THREE.Group();
    mainGroup.position.set(0, 1.25, 0);
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // Sparkle Dust Particles
    const particleCount = 32;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 4.8;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 4.8;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 4.8;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc6a15b,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Continuous smooth luxury turntable auto-rotation
      if (autoRotate && !isDraggingRef.current) {
        manualRotationRef.current.y += 0.006;
        // Gently relax user vertical drag tilt back to neutral elevation
        manualRotationRef.current.x += (0 - manualRotationRef.current.x) * 0.02;
      }

      if (mainGroupRef.current) {
        currentRotationRef.current.x +=
          (targetRotationRef.current.x + manualRotationRef.current.x - currentRotationRef.current.x) * 0.08;
        currentRotationRef.current.y +=
          (targetRotationRef.current.y + manualRotationRef.current.y - currentRotationRef.current.y) * 0.08;
        currentRotationRef.current.z +=
          (targetRotationRef.current.z - currentRotationRef.current.z) * 0.08;

        currentScaleRef.current +=
          (baseScaleRef.current * targetScaleRef.current - currentScaleRef.current) * 0.08;

        mainGroupRef.current.rotation.x = currentRotationRef.current.x;
        mainGroupRef.current.rotation.y = currentRotationRef.current.y;
        mainGroupRef.current.rotation.z = currentRotationRef.current.z;
        mainGroupRef.current.scale.setScalar(currentScaleRef.current);

        if (!isDraggingRef.current) {
          mainGroupRef.current.position.y = 1.25 + Math.sin(elapsedTime * 1.6) * 0.025;
        }
      }

      particles.rotation.y = elapsedTime * 0.035;

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [createStudioEnvironment]);

  // -------------------------------------------------------------
  // Rebuild Gemstone Mesh on Cut / Color Change
  // (FLAT SHADING ON FACETS FOR RAZOR-SHARP MIRROR REFRACTION)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!mainGroupRef.current) return;
    const group = mainGroupRef.current;

    if (gemMeshRef.current) {
      group.remove(gemMeshRef.current);
      gemMeshRef.current.geometry.dispose();
      if (Array.isArray(gemMeshRef.current.material)) {
        gemMeshRef.current.material.forEach((m) => m.dispose());
      } else {
        gemMeshRef.current.material.dispose();
      }
    }

    let geometry: THREE.BufferGeometry;
    if (cut === "emerald") {
      geometry = createEmeraldCutGeometry();
    } else if (cut === "cushion") {
      geometry = createCushionCutGeometry();
    } else {
      geometry = createRoundBrilliantGeometry();
    }

    const colorProfiles = {
      diamond: {
        color: 0xffffff,
        attenuationColor: 0xfcfbf7,
        transmission: 0.99,
        ior: 2.417,
        dispersion: 0.08,
      },
      emerald: {
        color: 0x0fa55d,
        attenuationColor: 0x05381a,
        transmission: 0.88,
        ior: 1.58,
        dispersion: 0.025,
      },
      ruby: {
        color: 0xd9163d,
        attenuationColor: 0x540614,
        transmission: 0.86,
        ior: 1.77,
        dispersion: 0.028,
      },
      sapphire: {
        color: 0x1d4ed8,
        attenuationColor: 0x061545,
        transmission: 0.88,
        ior: 1.77,
        dispersion: 0.028,
      },
    };

    const prof = colorProfiles[color] || colorProfiles.diamond;

    // Photorealistic Refractive Gemstone Material with Flat Facet Shading
    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: prof.color,
      emissive: new THREE.Color(0x0a0c10),
      metalness: 0.0,
      roughness: 0.0,
      transmission: prof.transmission,
      ior: prof.ior,
      thickness: 2.8,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      attenuationColor: new THREE.Color(prof.attenuationColor),
      attenuationDistance: 2.0,
      dispersion: prof.dispersion,
      reflectivity: 1.0,
      flatShading: true, // CRUCIAL FOR GENUINE GEMSTONE FACETING!
      transparent: true,
    });

    const gemMesh = new THREE.Mesh(geometry, gemMaterial);
    group.add(gemMesh);
    gemMeshRef.current = gemMesh;
  }, [
    cut,
    color,
    createEmeraldCutGeometry,
    createRoundBrilliantGeometry,
    createCushionCutGeometry,
  ]);

  // -------------------------------------------------------------
  // Rebuild Ring Mount on Alloy or Toggle Change
  // -------------------------------------------------------------
  useEffect(() => {
    if (!mainGroupRef.current) return;
    const group = mainGroupRef.current;

    if (mountingGroupRef.current) {
      group.remove(mountingGroupRef.current);
    }

    if (showMounting) {
      const mount = createRingMount(alloy);
      group.add(mount);
      mountingGroupRef.current = mount;
    }
  }, [showMounting, alloy, createRingMount]);

  // -------------------------------------------------------------
  // Scroll Choreography (Front -> Right -> Top -> Pavilion/Culet -> 360 Spin)
  // -------------------------------------------------------------
  useEffect(() => {
    if (scrollProgress === 0) return;

    const p = Math.max(0, Math.min(1, scrollProgress));

    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;
    let scale = 1.0;
    let angleLabel = "01 · FRONT ELEVATION";

    if (p <= 0.22) {
      const localT = p / 0.22;
      rotX = THREE.MathUtils.lerp(0, 0.15, localT);
      rotY = THREE.MathUtils.lerp(0, 0.65, localT);
      rotZ = THREE.MathUtils.lerp(0, -0.06, localT);
      scale = THREE.MathUtils.lerp(1.0, 1.08, localT);
      angleLabel =
        localT < 0.5 ? "01 · FRONT ELEVATION" : "02 · RIGHT CROWN PROFILE";
    } else if (p <= 0.5) {
      const localT = (p - 0.22) / 0.28;
      rotX = THREE.MathUtils.lerp(0.15, 0.72, localT);
      rotY = THREE.MathUtils.lerp(0.65, -0.45, localT);
      rotZ = THREE.MathUtils.lerp(-0.06, 0.18, localT);
      scale = THREE.MathUtils.lerp(1.08, 1.18, localT);
      angleLabel = "03 · TOP TABLE & GEOMETRIC FACETS";
    } else if (p <= 0.76) {
      const localT = (p - 0.5) / 0.26;
      rotX = THREE.MathUtils.lerp(0.72, -0.65, localT);
      rotY = THREE.MathUtils.lerp(-0.45, 1.45, localT);
      rotZ = THREE.MathUtils.lerp(0.18, -0.15, localT);
      scale = THREE.MathUtils.lerp(1.18, 1.28, localT);
      angleLabel = "04 · STEP-FACETED PAVILION & CULET";
    } else {
      const localT = (p - 0.76) / 0.24;
      rotX = THREE.MathUtils.lerp(-0.65, 0.08, localT);
      rotY = THREE.MathUtils.lerp(1.45, Math.PI * 2, localT);
      rotZ = THREE.MathUtils.lerp(-0.15, 0, localT);
      scale = THREE.MathUtils.lerp(1.28, 1.45, localT);
      angleLabel = "05 · 360° TOTAL INSPECTION";
    }

    targetRotationRef.current = { x: rotX, y: rotY, z: rotZ };
    targetScaleRef.current = scale;

    if (onAngleChange) {
      onAngleChange(angleLabel);
    }
  }, [scrollProgress, onAngleChange]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (mountRef.current && keyLightRef.current) {
      const rect = mountRef.current.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const ny = -((e.clientY - rect.top) / rect.height - 0.5) * 6;
      keyLightRef.current.position.set(nx, ny + 2.5, 4.4);
    }

    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMouseRef.current.x;
    const deltaY = e.clientY - previousMouseRef.current.y;

    manualRotationRef.current.y += deltaX * 0.008;
    manualRotationRef.current.x += deltaY * 0.008;

    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={mountRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing touch-none select-none ${className}`}
      data-cursor="explore"
      title="Drag to orbit solitaire in 3D"
    />
  );
}
