import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/fondofinal.png';
import logoImage from '../assets/logoImage.png';

const LandingPage = () => {
  const [enviadoExitosamente, setEnviadoExitosamente] = useState(false);
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    nombres: '',
    celular: '',
    cuenta: '',
    ciudad: '',
    animacion: 0
  });

  useEffect(() => {
    // Setup de la escena de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Crear el efecto de humo con partículas
    const particleCount = 1000;
    const particles = new THREE.Geometry();
    const pMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.2,
      transparent: true,
      opacity: 0.5
    });

    for (let i = 0; i < particleCount; i++) {
      const pX = Math.random() * 2 - 1;
      const pY = Math.random() * 2 - 1;
      const pZ = Math.random() * 2 - 1;

      const particle = new THREE.Vector3(pX, pY, pZ);
      particles.vertices.push(particle);
    }

    const particleSystem = new THREE.Points(particles, pMaterial);
    scene.add(particleSystem);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.x += 0.001;
      particleSystem.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Limpieza cuando el componente se desmonte
      renderer.dispose();
      scene.dispose();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombres || !formData.celular || !formData.cuenta || !formData.ciudad) {
      alert('Todos los campos son obligatorios');
      return;
    } else {
      try {
        formData.animacion = 1; // Set your animation ID here
        const response = await fetch('https://app.cotzul.com/Otros/registroloteria.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setEnviadoExitosamente(true);
          window.location.href = '?animacion=' + formData.animacion + "&paso=1";
        } else {
          console.log("Error en la respuesta del servidor");
        }
      } catch (error) {
        console.error('Error de red o del lado del cliente', error);
      }
    }
  };

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
        {enviadoExitosamente ? (
          <div>
            <img src={logoImage} alt="Logo" style={{ width: '100vw' }} />
            <h1 style={{ textAlign: 'center', color: '#FFF' }}>¡Envío Exitoso!</h1>
            <p style={{ textAlign: 'center', color: '#FFF' }}>Gracias por registrarte. Tomate la foto con Guachito y súbelo a tu Instagram.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              width: '80%',
              margin: 'auto',
            }}
          >
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
              />
            </div>
            <div>
              <label>Celular:</label>
              <input
                type="tel"
                name="celular"
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
              />
            </div>
            <div>
              <label>Cuenta:</label>
              <input
                type="text"
                name="cuenta"
                value={formData.cuenta}
                onChange={(e) => setFormData({ ...formData, cuenta: e.target.value })}
              />
            </div>
            <div>
              <label>Ciudad:</label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
              />
            </div>
            <button type="submit">Enviar</button>
          </form>
        )}
      </div>

      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
    </>
  );
};

export default LandingPage;

