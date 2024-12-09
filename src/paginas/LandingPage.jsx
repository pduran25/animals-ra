import React, { useEffect } from 'react';
import * as THREE from 'three';
import createSmokeEffect from './humo';  // Asegúrate de importar la función
import backgroundImage from '../assets/fondofinal.png';
import logoImage from '../assets/logoImage.png';
import parteImage from '../assets/parteImage.png';

const LandingPage = () => {
  useEffect(() => {
    // Crear la escena, cámara y renderizador de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);  // Agregar el canvas de Three.js al DOM

    // Crear el efecto de humo
    createSmokeEffect(scene);

    // Agregar una luz para iluminar el escenario
    const light = new THREE.AmbientLight(0x404040);  // Luz ambiental suave
    scene.add(light);

    // Posicionar la cámara
    camera.position.z = 5;

    // Función de animación de Three.js
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
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
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: '100vw' }}
        />
      </div>
      <h1 style={{ textAlign: 'center', color: '#FFF' }}>¡Envío Exitoso!</h1>
      <p style={{ textAlign: 'center', color: '#FFF' }}>Gracias por registrarte. Tomate la foto con Guachito y súbelo a tu Instagram.</p>
      <div className="App" style={{ width: '100%', height: '100%' }}>
        <model-viewer
          src="./assets/guachosaco.glb"
          ios-src="./assets/guachosaco.usdz"
          camera-controls
          camera-orbit="-40deg 70deg 200m"
          camera-target="0 0 0"
          ar
          ar-modes="scene-viewer webxr quick-look"
          xr-environment
          ar-placement="wall"
          autoplay
        >
          <button slot="ar-button">Ingresa</button>
        </model-viewer>
      </div>
    </div>
  );
};

export default LandingPage;
