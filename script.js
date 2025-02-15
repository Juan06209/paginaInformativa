import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

// Configurar la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear geometría de partículas
const particles = new THREE.BufferGeometry();
const count = 5000; // Cantidad de partículas
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i += 3) {
    let radius = Math.random() * 5;
    let theta = Math.random() * Math.PI * 2;
    let phi = Math.random() * Math.PI;

    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);

    // Asignar colores aleatorios con tonos de azul y violeta
    colors[i] = 0.2 + Math.random() * 0.8;
    colors[i + 1] = 0.1 + Math.random() * 0.4;
    colors[i + 2] = 0.8 + Math.random() * 0.2;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Material de partículas
const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending
});

// Crear la nube de partículas
const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);

camera.position.z = 5;

// Animación
function animate() {
    requestAnimationFrame(animate);
    
    // Rotar lentamente las partículas
    particleSystem.rotation.y += 0.001;
    particleSystem.rotation.x += 0.0005;
    
    renderer.render(scene, camera);
}

// Ajustar tamaño de pantalla
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animate();

// Detectar cuando las secciones están en el viewport
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
});

// Añadir clase visible a las secciones cuando se navega a través del menú
document.querySelectorAll('.barra-navegacion a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        targetSection.classList.add('visible');
    });
});