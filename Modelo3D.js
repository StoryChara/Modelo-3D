document.addEventListener('DOMContentLoaded', () => {
  // Configuración básica de la escena
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Añade el renderizador al contenedor
  const container = document.getElementById("canvas-container");
  container.appendChild(renderer.domElement);

  // Añadir luz direccional a la escena
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Ajusta la intensidad
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // Añadir luz ambiental a la escena
  const ambientLight = new THREE.AmbientLight(0x404040, 1); // Ajusta la intensidad
  scene.add(ambientLight);

  // Añadir luz puntual a la escena
  const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Ajusta la intensidad
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // Añadir luz direccional en la parte de atrás
  const backLight = new THREE.DirectionalLight(0xffffff, 1); // Ajusta la intensidad
  backLight.position.set(-5, -10, -7.5);
  scene.add(backLight);

  // Cargar el archivo GLB
  const loader = new THREE.GLTFLoader();
  loader.load(
    'models/Fresa.glb', // Ruta al archivo .glb
    (gltf) => {
      const obj = gltf.scene;
      obj.traverse((child) => {
        if (child.isMesh) {
          const material = child.material;
          if (material) {
            // Remove invalid properties
            delete material.specularIntensity;
            delete material.specularColor;
          }
        }
      });
      obj.position.set(0, 0, 0); // Ajusta la posición del modelo
      obj.scale.set(1, 1, 1); // Ajusta el tamaño del modelo
      scene.add(obj);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% cargado');
    },
    (error) => {
      console.error('Error al cargar el archivo GLB:', error);
    }
  );

  // Configuración de la cámara
  camera.position.z = 3; // Ajusta el valor para tener más zoom por defecto

  // Añadir OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Función de animación
  function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Actualizar controles
    renderer.render(scene, camera);
  }
  animate();

  // Ajustar el tamaño del renderizador al redimensionar la ventana
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
});


