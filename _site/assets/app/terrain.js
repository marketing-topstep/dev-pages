const container = document.getElementById("bg");

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(0, 18, 38);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Terrain geometry
const terrainWidth = 320;
const terrainDepth = 420;
const terrainSegmentsX = 260;
const terrainSegmentsZ = 340;

const scene = new THREE.Scene();

const geometry = new THREE.PlaneGeometry(
  terrainWidth,
  terrainDepth,
  terrainSegmentsX,
  terrainSegmentsZ
);

geometry.rotateX(-Math.PI / 2);

function getHeight(x, z, time = 0) {
  const largeWaves =
    Math.sin(x * 0.09 + time * 0.8) * 4.0 +
    Math.cos(z * 0.08 + time * 0.6) * 4.0;

  const mediumWaves =
    Math.sin(x * 0.18 + z * 0.12 + time * 1.2) * 2.5 +
    Math.cos(z * 0.22 - x * 0.1 + time * 0.9) * 2.0;

  const smallDetail =
    Math.sin(x * 0.45 + time * 1.8) * 0.6 +
    Math.cos(z * 0.5 + time * 1.5) * 0.6;

  const ridgeBias = Math.max(0, (z + 30) * 0.06);

  return largeWaves + mediumWaves + smallDetail + ridgeBias;
}

const position = geometry.attributes.position;

for (let i = 0; i < position.count; i++) {
  const x = position.getX(i);
  const z = position.getZ(i);
  position.setY(i, getHeight(x, z, 0));
}

position.needsUpdate = true;

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
  transparent: true,
  opacity: 0.035
});

const terrain = new THREE.Mesh(geometry, material);
terrain.position.z = -40;
scene.add(terrain);

// Theme helpers
function isDarkMode() {
  return (
    document.documentElement.classList.contains("dark") ||
    document.documentElement.getAttribute("data-theme") === "dark"
  );
}

function applyTheme() {
  const darkMode = isDarkMode();

  const backgroundColor = darkMode ? 0x000000 : 0xffffff;
  const terrainColor = darkMode ? 0xffffff : 0x000000;
  const fogColor = darkMode ? 0x000000 : 0xffffff;

  renderer.setClearColor(backgroundColor, 1);
  material.color.setHex(terrainColor);
  scene.fog = new THREE.Fog(fogColor, 60, 180);
}

applyTheme();

// Watch for OS/browser theme changes
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
if (mediaQuery.addEventListener) {
  mediaQuery.addEventListener("change", applyTheme);
} else {
  mediaQuery.addListener(applyTheme);
}

// Watch for html class changes, useful for Tailwind dark mode toggles
const observer = new MutationObserver(() => {
  applyTheme();
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class", "data-theme"]
});

// Interaction state
const mouse = {
  x: 0,
  y: 0
};

const cameraState = {
  baseY: 18,
  scrollYOffset: 0,
  currentY: 18,
  currentLookX: 0,
  targetLookX: 0
};

// Mouse move: normalize to range -1 to 1
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
});

// Scroll: move camera up/down
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || window.pageYOffset;
  cameraState.scrollYOffset = scrollTop * 0.02;
});

function animateTerrain(time) {
  const t = time * 0.00025;
  const position = terrain.geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    position.setY(i, getHeight(x, z, t));
  }

  position.needsUpdate = true;
}

function animate(time) {
  requestAnimationFrame(animate);

  animateTerrain(time);

  cameraState.targetLookX = mouse.x * 12;
  cameraState.currentLookX +=
    (cameraState.targetLookX - cameraState.currentLookX) * 0.05;

  const targetY =
    cameraState.baseY +
    cameraState.scrollYOffset +
    Math.sin(time * 0.00018) * 1.2;

  cameraState.currentY += (targetY - cameraState.currentY) * 0.08;

  camera.position.x = Math.sin(time * 0.00012) * 3;
  camera.position.y = cameraState.currentY;
  camera.position.z = 38;

  camera.lookAt(cameraState.currentLookX, 0, -30);

  renderer.render(scene, camera);
}

animate(0);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});