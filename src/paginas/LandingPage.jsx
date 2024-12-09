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
    const particles = new THREE.Geometry();
    const pMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 1,
      map: smokeTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
      const pX = Math.random() * 500 - 250;
      const pY = Math.random() * 500 - 250;
      const pZ = Math.random() * 500 - 250;
      const particle = new THREE.Vector3(pX, pY, pZ);
      particles.vertices.push(particle);
    }

    // Crear el sistema de partículas
    const particleSystem = new THREE.Points(particles, pMaterial);
    scene.add(particleSystem);

    // Animación del sistema de partículas (movimiento del humo)
    const animateParticles = () => {
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
