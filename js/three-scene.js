/**
 * three-scene.js
 * Background particle canvas ONLY.
 * Does NOT touch #model-container — GSAP in main.js owns all model transforms.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 6);

  const clock = new THREE.Clock();

  /* ─── Particles ──────────────────────────────────────────── */
  const COUNT = 300;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const velocities = new Float32Array(COUNT * 3);

  const palette = [
    new THREE.Color('#6366f1'),
    new THREE.Color('#8b5cf6'),
    new THREE.Color('#06b6d4'),
  ];

  for (let i = 0; i < COUNT; i++) {
    const r = 3 + Math.random() * 6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    velocities[i * 3] = (Math.random() - 0.5) * 0.003;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    const c = palette[i % palette.length];
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.045, vertexColors: true, transparent: true,
    opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false,
  });

  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  /* ─── Lighting ───────────────────────────────────────────── */
  scene.add(new THREE.AmbientLight(0x0a0a20, 1.2));
  const p1 = new THREE.PointLight(0x6366f1, 4, 25);
  p1.position.set(5, 5, 5); scene.add(p1);
  const p2 = new THREE.PointLight(0x8b5cf6, 3, 20);
  p2.position.set(-5, -5, 5); scene.add(p2);

  /* ─── Render Loop ────────────────────────────────────────── */
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const pos = geo.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(pos[i * 3]) > 8) velocities[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 8) velocities[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 8) velocities[i * 3 + 2] *= -1;
    }
    geo.attributes.position.needsUpdate = true;
    pts.rotation.y += delta * 0.025;
    pts.rotation.x += delta * 0.008;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();