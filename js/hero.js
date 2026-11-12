(() => {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || !window.THREE || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const setSize = () => renderer.setSize(window.innerWidth, window.innerHeight, false);
  setSize();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.set(0, 0.4, 11);

  scene.add(new THREE.AmbientLight(0x1a2744, 1.2));
  const key = new THREE.DirectionalLight(0xe8d5b0, 1.6);
  key.position.set(4, 6, 8);
  scene.add(key);

  const gold = new THREE.MeshStandardMaterial({
    color: 0xc4a574,
    metalness: 0.9,
    roughness: 0.22,
    emissive: 0x2a1e10,
    emissiveIntensity: 0.2,
  });
  const wire = new THREE.MeshBasicMaterial({
    color: 0xe8d5b0,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
  });

  const world = new THREE.Group();
  scene.add(world);

  const items = [
    [new THREE.IcosahedronGeometry(1.1, 0), gold, [5.8, 1.8, -2]],
    [new THREE.OctahedronGeometry(0.7), wire, [-6.2, 2.1, -1]],
    [new THREE.TorusGeometry(1.6, 0.03, 12, 80), gold, [3.4, -2.6, -3]],
    [new THREE.TetrahedronGeometry(0.55), gold, [-4.6, -1.8, 1.4]],
    [new THREE.BoxGeometry(0.5, 0.5, 0.5), wire, [6.4, -0.6, -4]],
  ];
  const meshes = items.map(([geo, mat, pos]) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    world.add(mesh);
    return mesh;
  });

  const count = 500;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    pos[i * 3] = (Math.random() - 0.5) * 22;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
  }
  const cloud = new THREE.Points(
    new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(pos, 3)),
    new THREE.PointsMaterial({ color: 0xe8d5b0, size: 0.03, transparent: true, opacity: 0.45 })
  );
  world.add(cloud);

  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  });
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    setSize();
  });

  const clock = new THREE.Clock();
  const loop = () => {
    requestAnimationFrame(loop);
    const t = clock.getElapsedTime();
    world.rotation.y = t * 0.04 + pointer.x * 0.12;
    world.rotation.x = pointer.y * 0.06;
    cloud.rotation.y = t * -0.02;
    meshes.forEach((mesh, i) => {
      mesh.rotation.x = t * (0.12 + i * 0.03);
      mesh.rotation.y = t * (0.08 + i * 0.02);
    });
    renderer.render(scene, camera);
  };
  loop();
})();
