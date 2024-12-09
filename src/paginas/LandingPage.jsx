import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/fondofinal.png';
import logoImage from '../assets/logoImage.png';

const LandingPage = () => {
  var source = "./assets/guachosorpresa.glb";
  var source2 = "./assets/guachosorpresa.usdz";

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const modelViewerRef = useRef(null); // Referencia para el model-viewer

  const toggleAudio = () => {
    const audioElement = document.getElementById('myAudio');
    if (isAudioPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  useEffect(() => {
    // Aseguramos que el script de Three.js ya esté cargado en el entorno global
    if (typeof THREE === 'undefined') {
      console.error('Three.js no está cargado.');
      return;
    }

    // Crear un sistema de partículas para el humo usando Three.js
    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const scene = viewer.scene;
    const camera = viewer.camera;

    // Textura para el humo
    const smokeTexture = new THREE.TextureLoader().load('smoke.png'); // Reemplaza con la ruta de tu textura

    // Parámetros para las partículas de humo
    const particleCount = 1000;

    // Usar BufferGeometry en lugar de Geometry
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3); // 3 valores por partícula (X, Y, Z)
    const velocities = new Float32Array(particleCount * 3); // Velocidades de las partículas

    for (let i = 0; i < particleCount; i++) {
      const pX = Math.random() * 500 - 250;
      const pY = Math.random() * 500 - 250;
      const pZ = Math.random() * 500 - 250;

      positions[i * 3] = pX;
      positions[i * 3 + 1] = pY;
      positions[i * 3 + 2] = pZ;

      velocities[i * 3] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Material de partículas
    const pMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 1,
      map: smokeTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    // Crear el sistema de partículas
    const particleSystem = new THREE.Points(particles, pMaterial);
    scene.add(particleSystem);

    // Animación del sistema de partículas (movimiento del humo)
    const animateParticles = () => {
      const positions = particleSystem.geometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
      }
      
      particleSystem.geometry.attributes.position.needsUpdate = true;

      particleSystem.rotation.y += 0.01;
      viewer.renderer.render(scene, camera);
      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }, []); // Este efecto solo se ejecuta una vez al cargar el componente

  return (
    <>
      <div
        style={{
          background: `url(${backgroundImage}) repeat fixed center center / cover`,
          height: '100%',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <img src={logoImage} alt="Logo" style={{ width: '100vw' }} />
          </div>
          <h1 style={{ textAlign: 'center', color: '#FFF' }}>¡Envío Exitoso!</h1>
          <p style={{ textAlign: 'center', color: '#FFF' }}>
            Gracias por registrarte. Tomate la foto con Guachito y súbelo a tu Instagram.
          </p>
          <div className="App" style={{ width: '100%', height: '100%' }}>
            <model-viewer
              ref={modelViewerRef}
              src={source}
              ios-src={source2}
              camera-controls
              camera-orbit="-40deg 70deg 200m"
              camera-target="0 0 0"
              ar
              ar-modes="scene-viewer webxr quick-look"
              xr-environment
              ar-placement="wall"
              autoplay
            >
              <Boton slot="ar-button">Ingresa</Boton>
            </model-viewer>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

const SoundButton = styled.img`
  display: inline-block;
`;

const Boton = styled.button`
  display: inline-block;
  border: none;
  border-radius: 4px;
  background-color: #006a22;
  color: #fff;
  width: 70%;
  margin: 15%;
  margin-top: 0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  align-items: 'center',

  &:hover {
    background-color: #006a22;
  }

  &:focus {
    outline: none;
    background-color: #006a22;
  }
`;
