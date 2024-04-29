// First Three.js 3D website
import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

console.log("3D Moon on page");

// scene
const scene = new THREE.Scene();

// backgroung
const bg = new THREE.TextureLoader().load("public/bg5.jpg");
scene.background = bg;

// stars
function addStars() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStars);

// sphere
const moonTexture = new THREE.TextureLoader().load("public/moon.jpg");
const normal = new THREE.TextureLoader().load("public/normal.jpg");
const geometry = new THREE.SphereGeometry(3, 64, 64);
// const geometry = new THREE.TorusGeometry(2, 1, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: "#fff",
  roughness: 0.5,
  map: moonTexture,
  // normalMap: normal,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// light
// const light = new THREE.PointLight(0xffffff, 100, 100);
const light2 = new THREE.AmbientLight(0x404040, 40);
light2.position.set(5, 5, 5);
scene.add(light2);
// scene.add(light, light2);

// light Helper
// const lightHelper = new THREE.PointLightHelper(light2);
// scene.add(lightHelper);

// grid helper
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

// camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 15;
scene.add(camera);

// render
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// controsl
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
// controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;

// play - pause moon
const btn = document.querySelector("img");
btn.addEventListener("click", () => {
  if (controls.autoRotate == true) {
    controls.autoRotate = false;
    btn.src = "public/play-solid.svg";
  } else {
    controls.autoRotate = true;
    btn.src = "public/circle-pause-regular.svg";
  }
});

// resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

// loop render
const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// timeline animation
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
