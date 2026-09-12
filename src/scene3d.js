import * as THREE from 'three';

export function init3DScene() {
  const container = document.getElementById('canvas-3d-wrapper');
  if (!container) return;

  const canvas = document.getElementById('canvas-3d');
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1C1F25);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 7.5);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // Lighting (Executive Brass & Architectural Shadows)
  const ambientLight = new THREE.AmbientLight(0x282c37, 1.2);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xDDD0B8, 2.5); // Ash Parchment
  keyLight.position.set(5, 6, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x3A3F4C, 1.0); // Ash Gray rim
  fillLight.position.set(-5, -4, -3);
  scene.add(fillLight);

  const cursorPointLight = new THREE.PointLight(0xC9B99A, 1.8, 10);
  cursorPointLight.position.set(0, 0, 4);
  scene.add(cursorPointLight);

  // Materials (Tactile, Non-Glass Solid Finishes)
  const brassMaterial = new THREE.MeshStandardMaterial({
    color: 0xC9B99A,
    metalness: 0.8,
    roughness: 0.3,
    flatShading: true
  });

  const darkCarbonMaterial = new THREE.MeshStandardMaterial({
    color: 0x292D37,
    metalness: 0.4,
    roughness: 0.5,
    flatShading: true
  });

  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xC9B99A,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0x10B981, // Emerald KPI node
    metalness: 0.9,
    roughness: 0.15
  });

  // Main Assembly Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // 1. Central Core: Monolithic Faceted Gem (Strategic Command)
  const coreGeo = new THREE.IcosahedronGeometry(1.6, 0);
  const coreMesh = new THREE.Mesh(coreGeo, brassMaterial);
  masterGroup.add(coreMesh);

  // Wireframe shroud
  const wireGeo = new THREE.IcosahedronGeometry(1.65, 0);
  const wireMesh = new THREE.Mesh(wireGeo, wireframeMaterial);
  masterGroup.add(wireMesh);

  // 2. Gimbal Ring 1 (Macroeconomics Axis)
  const ring1Geo = new THREE.TorusGeometry(2.35, 0.04, 16, 100);
  const ring1 = new THREE.Mesh(ring1Geo, darkCarbonMaterial);
  masterGroup.add(ring1);

  // 3. Gimbal Ring 2 (Unit Economics & Operations Axis)
  const ring2Geo = new THREE.TorusGeometry(2.7, 0.03, 16, 100);
  const ring2 = new THREE.Mesh(ring2Geo, brassMaterial);
  ring2.rotation.x = Math.PI / 3;
  masterGroup.add(ring2);

  // 4. Gimbal Ring 3 (Supply Chain & P&L Outer Orbit)
  const ring3Geo = new THREE.TorusGeometry(3.05, 0.02, 16, 100);
  const ring3 = new THREE.Mesh(ring3Geo, darkCarbonMaterial);
  ring3.rotation.y = Math.PI / 4;
  masterGroup.add(ring3);

  // 5. Satellite Data Nodes (Operations, Sales, Margin, Cash Flow)
  const nodesGroup = new THREE.Group();
  masterGroup.add(nodesGroup);

  const nodeGeo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
  const nodeCount = 6;
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    const mesh = new THREE.Mesh(nodeGeo, i % 2 === 0 ? brassMaterial : darkCarbonMaterial);
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = 2.65;
    mesh.position.set(
      Math.cos(angle) * radius,
      (Math.sin(angle * 2) * 0.4),
      Math.sin(angle) * radius
    );
    nodesGroup.add(mesh);
    nodes.push({ mesh, angle, speed: 0.008 + (i * 0.002) });
  }

  // Tracking Mouse & Inertia
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  function onPointerMove(event) {
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

    if (isDragging) {
      const deltaX = event.clientX - prevMouseX;
      const deltaY = event.clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      prevMouseX = event.clientX;
      prevMouseY = event.clientY;
    } else {
      targetRotationY = x * 0.6;
      targetRotationX = -y * 0.6;
      cursorPointLight.position.x = x * 3;
      cursorPointLight.position.y = y * 3;
    }
  }

  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
  });

  container.addEventListener('pointermove', onPointerMove);

  // Scroll reaction
  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = window.scrollY / (maxScroll || 1);
  }, { passive: true });

  // Click Pulse Shockwave
  container.addEventListener('click', () => {
    coreMesh.scale.set(1.2, 1.2, 1.2);
    cursorPointLight.intensity = 4.5;
  });

  // Resize Handler
  function handleResize() {
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  const resizeObserver = new ResizeObserver(() => handleResize());
  resizeObserver.observe(container);

  // Animation Loop (60 FPS GPU Lerp)
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Lerp rotation to target
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;

    // Base continuous rotation + mouse influence
    masterGroup.rotation.y = currentRotationY + elapsedTime * 0.15;
    masterGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.3) * 0.08;

    // Scroll influence
    masterGroup.position.y = Math.sin(scrollProgress * Math.PI) * 0.3;

    // Gimbal ring counter-rotations
    ring1.rotation.z = elapsedTime * 0.3;
    ring2.rotation.y = -elapsedTime * 0.4;
    ring3.rotation.x = elapsedTime * 0.25;

    // Orbiting nodes
    nodes.forEach(node => {
      node.angle += node.speed;
      node.mesh.position.x = Math.cos(node.angle) * 2.65;
      node.mesh.position.z = Math.sin(node.angle) * 2.65;
      node.mesh.rotation.x += 0.02;
      node.mesh.rotation.y += 0.02;
    });

    // Pulse decay for core
    coreMesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
    cursorPointLight.intensity = THREE.MathUtils.lerp(cursorPointLight.intensity, 1.8, 0.05);

    renderer.render(scene, camera);
  }

  animate();
}
