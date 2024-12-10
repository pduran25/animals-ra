// humo.js

import * as THREE from 'three';

function createSmokeEffect(scene) {
  const smokeGeometry = new THREE.BufferGeometry();
  const smokeMaterial = new THREE.PointsMaterial({
    color: 0x999999,  // Color del humo (gris claro)
    size: 5,  // Tamaño de las partículas
    transparent: true,
    opacity: 0.5,
  });

  const smokeParticles = new THREE.Points(smokeGeometry, smokeMaterial);

  // Crear partículas aleatorias para el humo
  const particleCount = 1000;  // Número de partículas
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;  // X
    positions[i * 3 + 1] = Math.random() * 50;  // Y (crecimiento del humo)
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;  // Z
  }
  
  smokeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  scene.add(smokeParticles);

  // Animar el humo (subir las partículas y dispersarse)
  function animateSmoke() {
    smokeParticles.rotation.y += 0.001;
    const positions = smokeParticles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += 0.05;  // Hacer que el humo suba
      if (positions[i + 1] > 50) {
        positions[i + 1] = 0;  // Reiniciar la altura de las partículas
      }
    }
    smokeParticles.geometry.attributes.position.needsUpdate = true;
    requestAnimationFrame(animateSmoke);
  }

  animateSmoke();
}

export default createSmokeEffect;
