(() => {
  const canvas = document.getElementById("scene");
  const rig = document.getElementById("rig");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (event) => {
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const y = event.touches ? event.touches[0].clientY : event.clientY;
    pointer.tx = (x / window.innerWidth) * 2 - 1;
    pointer.ty = (y / window.innerHeight) * 2 - 1;
  };

  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("touchmove", onPointer, { passive: true });

  if (!window.THREE || reduceMotion) {
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x070b16, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070b16, 0.042);

  const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.set(0, 0, 14);

  scene.add(new THREE.AmbientLight(0x1c2744, 1.4));

  const key = new THREE.DirectionalLight(0xe8d5b0, 1.8);
  key.position.set(6, 8, 10);
  scene.add(key);

  const fill = new THREE.PointLight(0xc4a574, 18, 28, 2);
  fill.position.set(-6, -2, 4);
  scene.add(fill);

  const rim = new THREE.PointLight(0x4a6aa8, 10, 24, 2);
  rim.position.set(5, 4, -6);
  scene.add(rim);

  const gold = new THREE.MeshStandardMaterial({
    color: 0xc4a574,
    metalness: 0.92,
    roughness: 0.22,
    emissive: 0x3a2a12,
    emissiveIntensity: 0.22,
  });

  const goldWire = new THREE.MeshBasicMaterial({
    color: 0xe8d5b0,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
  });

  const navy = new THREE.MeshStandardMaterial({
    color: 0x152038,
    metalness: 0.7,
    roughness: 0.35,
    emissive: 0x0a1428,
    emissiveIntensity: 0.4,
  });

  const world = new THREE.Group();
  scene.add(world);

  const shapes = [
    { geo: new THREE.IcosahedronGeometry(1.15, 0), mat: gold, pos: [5.6, 2.2, -2.4], rot: 0.22 },
    { geo: new THREE.OctahedronGeometry(0.85), mat: goldWire, pos: [-5.8, 1.6, -1.2], rot: 0.18 },
    { geo: new THREE.TetrahedronGeometry(0.7), mat: gold, pos: [-4.4, -2.8, 1.4], rot: 0.28 },
    { geo: new THREE.DodecahedronGeometry(0.95, 0), mat: navy, pos: [4.8, -2.6, -0.6], rot: 0.16 },
    { geo: new THREE.TorusGeometry(1.35, 0.035, 16, 80), mat: gold, pos: [-1.8, 3.6, -4], rot: 0.12 },
    { geo: new THREE.TorusGeometry(1.8, 0.028, 12, 90), mat: goldWire, pos: [2.4, -3.4, -3.2], rot: 0.1 },
    { geo: new THREE.IcosahedronGeometry(0.45, 0), mat: gold, pos: [3.2, 3.4, 1.6], rot: 0.34 },
    { geo: new THREE.OctahedronGeometry(0.38), mat: gold, pos: [-3.1, 3.1, 2], rot: 0.3 },
    { geo: new THREE.BoxGeometry(0.55, 0.55, 0.55), mat: navy, pos: [6.2, -0.4, -3.6], rot: 0.2 },
  ];

  const meshes = shapes.map((item) => {
    const mesh = new THREE.Mesh(item.geo, item.mat);
    mesh.position.set(...item.pos);
    mesh.userData.speed = item.rot;
    mesh.userData.origin = mesh.position.clone();
    world.add(mesh);
    return mesh;
  });

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(6.4, 0.018, 8, 160),
    new THREE.MeshBasicMaterial({ color: 0xc4a574, transparent: true, opacity: 0.18 })
  );
  ring.rotation.x = Math.PI / 2.35;
  world.add(ring);

  const count = 900;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const r = 4 + Math.random() * 12;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  const particles = new THREE.BufferGeometry();
  particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const cloud = new THREE.Points(
    particles,
    new THREE.PointsMaterial({
      color: 0xe8d5b0,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
  );
  world.add(cloud);

  const clock = new THREE.Clock();
  let width = window.innerWidth;
  let height = window.innerHeight;

  const onResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  window.addEventListener("resize", onResize);

  const animate = () => {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    pointer.x += (pointer.tx - pointer.x) * 0.045;
    pointer.y += (pointer.ty - pointer.y) * 0.045;

    world.rotation.y = t * 0.05 + pointer.x * 0.18;
    world.rotation.x = pointer.y * 0.1;
    cloud.rotation.y = t * -0.02;
    ring.rotation.z = t * 0.08;

    meshes.forEach((mesh, index) => {
      mesh.rotation.x = t * mesh.userData.speed;
      mesh.rotation.y = t * mesh.userData.speed * 0.7;
      const origin = mesh.userData.origin;
      mesh.position.y = origin.y + Math.sin(t * 0.7 + index) * 0.28;
    });

    camera.position.x = pointer.x * 0.8;
    camera.position.y = -pointer.y * 0.45;
    camera.lookAt(0, 0, 0);

    if (rig) {
      const tiltX = pointer.y * -8;
      const tiltY = pointer.x * 10;
      rig.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }

    renderer.render(scene, camera);
  };

  animate();
})();
