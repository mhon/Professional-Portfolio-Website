import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './universe-scene.css';

const COLORS = ['#ff9d52', '#ffd16b', '#54e5ec', '#a99aff', '#70e3a8'];
const GROUPS = [
  { name: 'Frontend', tech: ['Angular', 'React', 'TypeScript', 'Tailwind CSS'], color: '#63d9ed', radius: 2.5, tilt: 0.14, phase: 0.28 },
  { name: 'Backend', tech: ['PHP', 'Python', 'C#', 'Node.js', 'FastAPI'], color: '#ffa86b', radius: 3.02, tilt: 0.54, phase: 1.45 },
  { name: 'AI & Automation', tech: ['OpenAI API', 'LangChain', 'AI Agents'], color: '#b1a0ff', radius: 3.5, tilt: -0.34, phase: 2.7 },
  { name: 'Database', tech: ['PostgreSQL', 'MySQL', 'Supabase'], color: '#75dfb0', radius: 2.82, tilt: -0.65, phase: 3.9 },
  { name: 'Tools & DevOps', tech: ['Git', 'Docker', 'Vercel'], color: '#f4d575', radius: 3.8, tilt: 0.28, phase: 5.1 },
];

function labelTexture(title: string, subtitle?: string, accent = '#9be9e2') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = subtitle ? 112 : 76;
  const context = canvas.getContext('2d');
  if (!context) return null;

  context.fillStyle = 'rgba(9, 17, 23, 0.88)';
  context.strokeStyle = `${accent}88`;
  context.lineWidth = 2;
  context.beginPath();
  context.roundRect(3, 3, canvas.width - 6, canvas.height - 6, 19);
  context.fill();
  context.stroke();
  context.fillStyle = '#f0f5f6';
  context.font = subtitle ? '600 44px "Plus Jakarta Sans", sans-serif' : '500 42px "Plus Jakarta Sans", sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(title, canvas.width / 2, subtitle ? 39 : canvas.height / 2, canvas.width - 28);
  if (subtitle) {
    context.fillStyle = accent;
    context.font = '20px "Space Mono", monospace';
    context.fillText(subtitle, canvas.width / 2, 79, canvas.width - 24);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (!context) return null;
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.12, 'rgba(255,255,255,.8)');
  gradient.addColorStop(0.34, 'rgba(255,255,255,.25)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export function UniverseScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    if (!context) {
      setWebglUnavailable(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      context.getExtension('WEBGL_lose_context')?.loseContext();
      setWebglUnavailable(true);
      return;
    }

    setWebglUnavailable(false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = 'universe-canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
    camera.position.set(0, 0, 13.4);
    const root = new THREE.Group();
    root.rotation.x = -0.08;
    scene.add(root);

    const ambient = new THREE.AmbientLight(0x9fb9c4, 1.45);
    scene.add(ambient);
    const coreLight = new THREE.PointLight(0x59e9d5, 5.5, 11, 1.6);
    root.add(coreLight);

    const sun = new THREE.Group();
    root.add(sun);
    const coreMaterial = new THREE.MeshBasicMaterial({ color: COLORS[0] });
    const coreColors = COLORS.map((hex) => new THREE.Color(hex));
    const transitionColor = new THREE.Color();
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.53, 40, 32), coreMaterial);
    sun.add(core);
    const cageMaterial = new THREE.MeshBasicMaterial({ color: COLORS[2], wireframe: true, transparent: true, opacity: 0.6 });
    const cage = new THREE.Mesh(new THREE.SphereGeometry(0.69, 20, 14), cageMaterial);
    sun.add(cage);
    const glowTexture = makeGlowTexture();
    let glowMaterial: THREE.SpriteMaterial | null = null;
    if (glowTexture) {
      glowMaterial = new THREE.SpriteMaterial({ map: glowTexture, color: COLORS[2], transparent: true, opacity: 0.42, depthWrite: false, blending: THREE.AdditiveBlending });
      const glow = new THREE.Sprite(glowMaterial);
      glow.scale.set(3.8, 3.8, 1);
      sun.add(glow);
    }

    const dustCount = 320;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 7.5;
      dustPositions[i * 3] = Math.cos(angle) * radius;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 7.4;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.8;
      const tint = new THREE.Color().setHSL(0.48 + Math.random() * 0.12, 0.18, 0.55 + Math.random() * 0.34);
      dustColors[i * 3] = tint.r;
      dustColors[i * 3 + 1] = tint.g;
      dustColors[i * 3 + 2] = tint.b;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));
    const dustTexture = makeGlowTexture();
    let dust: THREE.Points | null = null;
    if (dustTexture) {
      const dustMaterial = new THREE.PointsMaterial({
        size: 0.075,
        map: dustTexture,
        transparent: true,
        opacity: 0.68,
        vertexColors: true,
        depthWrite: false,
        sizeAttenuation: true,
        alphaTest: 0.015,
      });
      dust = new THREE.Points(dustGeometry, dustMaterial);
      root.add(dust);
    } else {
      dustGeometry.dispose();
    }

    const orbitObjects: THREE.Group[] = [];
    const nodeObjects: THREE.Group[] = [];
    const beamLines: THREE.Line[] = [];
    const ownedTextures: THREE.Texture[] = [];
    GROUPS.forEach((group, index) => {
      const orbit = new THREE.Group();
      orbit.rotation.set(group.tilt, index * 0.51, index * 0.27);
      root.add(orbit);
      orbitObjects.push(orbit);

      const points: THREE.Vector3[] = [];
      for (let step = 0; step <= 160; step += 1) {
        const angle = (step / 160) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * group.radius, 0, Math.sin(angle) * group.radius * 0.58));
      }
      const ringMaterial = new THREE.LineBasicMaterial({ color: group.color, transparent: true, opacity: 0.19 });
      orbit.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), ringMaterial));

      const node = new THREE.Group();
      node.position.set(Math.cos(group.phase) * group.radius, 0, Math.sin(group.phase) * group.radius * 0.58);
      orbit.add(node);
      nodeObjects.push(node);

      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.085, 16, 12),
        new THREE.MeshBasicMaterial({ color: group.color }),
      );
      node.add(bead);
      if (glowTexture) {
        const markerGlowMaterial = new THREE.SpriteMaterial({
          map: glowTexture,
          color: group.color,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const markerGlow = new THREE.Sprite(markerGlowMaterial);
        markerGlow.scale.set(0.68, 0.68, 1);
        node.add(markerGlow);
      }

      const categoryTexture = labelTexture(group.name, undefined, group.color);
      if (categoryTexture) {
        ownedTextures.push(categoryTexture);
        const categoryLabel = new THREE.Sprite(new THREE.SpriteMaterial({ map: categoryTexture, transparent: true, depthWrite: false }));
        categoryLabel.scale.set(group.name.length > 13 ? 2.1 : 1.55, 0.4, 1);
        categoryLabel.position.set(0, 0.53, 0);
        node.add(categoryLabel);
      }

      group.tech.forEach((tech, techIndex) => {
        const texture = labelTexture(tech, undefined, group.color);
        if (!texture) return;
        ownedTextures.push(texture);
        const chip = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, opacity: 0.9 }));
        chip.scale.set(Math.max(0.9, Math.min(1.5, tech.length * 0.085)), 0.36, 1);
        const row = Math.floor(techIndex / 3);
        const column = techIndex % 3;
        const rowLength = Math.min(3, group.tech.length - row * 3);
        chip.position.set((column - (rowLength - 1) / 2) * 1.05, -0.52 - row * 0.43, 0.04);
        node.add(chip);
      });

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color: group.color,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      root.add(line);
      beamLines.push(line);
    });

    const updateBeams = () => {
      scene.updateMatrixWorld(true);
      nodeObjects.forEach((node, index) => {
        const worldPosition = new THREE.Vector3();
        node.getWorldPosition(worldPosition);
        root.worldToLocal(worldPosition);
        const positions = beamLines[index].geometry.getAttribute('position') as THREE.BufferAttribute;
        positions.setXYZ(0, 0, 0, 0);
        positions.setXYZ(1, worldPosition.x, worldPosition.y, worldPosition.z);
        positions.needsUpdate = true;
      });
    };

    // Set static endpoints before the first render too, including reduced-motion mode.
    updateBeams();

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 520 ? 15 : 13.4;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const clock = new THREE.Clock();
    let animationFrame = 0;
    let reducedMotionInterval = 0;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const colorStep = Math.floor(elapsed / 3.2);
      const colorIndex = colorStep % coreColors.length;
      const nextColorIndex = (colorIndex + 1) % coreColors.length;
      const transition = Math.min(1, (elapsed % 3.2) / 0.7);
      const smoothTransition = transition * transition * (3 - 2 * transition);
      transitionColor.copy(coreColors[colorIndex]).lerp(coreColors[nextColorIndex], smoothTransition);
      coreMaterial.color.copy(transitionColor);
      cageMaterial.color.copy(transitionColor);
      glowMaterial?.color.copy(transitionColor);
      coreLight.color.copy(transitionColor);

      if (!reducedMotion) {
        root.rotation.y = Math.sin(elapsed * 0.12) * 0.07;
        sun.scale.setScalar(1 + Math.sin(elapsed * 2.1) * 0.035);
        cage.rotation.set(elapsed * 0.11, elapsed * 0.17, elapsed * 0.07);
        if (glowMaterial) glowMaterial.opacity = 0.36 + (Math.sin(elapsed * 1.6) + 1) * 0.09;
        orbitObjects.forEach((orbit, index) => {
          orbit.rotation.y += (index % 2 ? -1 : 1) * 0.0011;
        });
        if (dust) dust.rotation.y = elapsed * 0.006;
      }
      updateBeams();
      renderer.render(scene, camera);
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(animate);
    };
    animate();
    if (reducedMotion) {
      reducedMotionInterval = window.setInterval(animate, 80);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearInterval(reducedMotionInterval);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
          else material.dispose();
        } else if (object instanceof THREE.Sprite) {
          object.material.dispose();
        }
      });
      ownedTextures.forEach((texture) => texture.dispose());
      glowTexture?.dispose();
      dustTexture?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="universe-frame">
      <div className="universe-status" aria-hidden="true">
        <span className="universe-status-dot" />
        <span>CORE SIGNAL <b>{webglUnavailable ? 'STANDBY' : 'ACTIVE'}</b></span>
      </div>
      <div
        ref={hostRef}
        className={`universe-canvas-host${webglUnavailable ? ' universe-fallback' : ''}`}
        role="img"
        aria-label="A 3D universe map: a glowing solar core connects by orbiting laser lines to Frontend, Backend, AI and Automation, Database, and Tools and DevOps skill systems."
      >
        {webglUnavailable && (
          <div className="universe-fallback-core" aria-hidden="true">
            <span className="fallback-orbit fallback-orbit-one" />
            <span className="fallback-orbit fallback-orbit-two" />
            <span className="fallback-beam fallback-beam-top" />
            <span className="fallback-beam fallback-beam-upper-left" />
            <span className="fallback-beam fallback-beam-right" />
            <span className="fallback-beam fallback-beam-left" />
            <span className="fallback-beam fallback-beam-bottom" />
            <span className="fallback-node fallback-node-top" />
            <span className="fallback-node fallback-node-upper-left" />
            <span className="fallback-node fallback-node-right" />
            <span className="fallback-node fallback-node-left" />
            <span className="fallback-node fallback-node-bottom" />
            <span className="fallback-sun" />
            <span className="fallback-label fallback-label-top">Frontend · Angular</span>
            <span className="fallback-label fallback-label-upper-left">Tools &amp; DevOps</span>
            <span className="fallback-label fallback-label-right">AI &amp; Automation</span>
            <span className="fallback-label fallback-label-bottom">Backend · PHP · C#</span>
            <span className="fallback-label fallback-label-left">Database · PostgreSQL</span>
          </div>
        )}
      </div>
      <p className="sr-only">
        Skill systems orbit a central core: Frontend includes Angular, React, TypeScript, and Tailwind CSS; Backend includes PHP, Python, C#, Node.js, and FastAPI; AI and Automation includes OpenAI API, LangChain, and AI Agents; Database includes PostgreSQL, MySQL, and Supabase; Tools and DevOps includes Git, Docker, and Vercel.
      </p>
      <div className="universe-caption" aria-hidden="true">
        <span>RAYMOND BASTASA</span>
        <i />
        <span>ENGINEERING SYSTEMS / 01</span>
      </div>
    </div>
  );
}
