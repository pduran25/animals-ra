import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/fondofinal.png';
import logoImage from '../assets/logoImage.png';

const LandingPage = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const source = "./assets/guachosorpresa.glb";
  const source2 = "./assets/guachosorpresa.usdz";

  const toggleAudio = () => {
    const audioElement = document.getElementById('myAudio');
    if (isAudioPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
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
        <div style={{ marginBottom: '20px' }}>
          <img
            src={logoImage}
            alt="Logo"
            style={{ width: '100vw' }}
          />
          <h1 style={{ textAlign: 'center', color: '#FFF' }}>¡Envío Exitoso!</h1>
          <p style={{ textAlign: 'center', color: '#FFF' }}>
            Gracias por registrarte. Tomate la foto con Guachito y súbelo a tu Instagram.
          </p>
          <div className="App" style={{ width: '100%', height: '100%' }}>
            <ModelContainer>
              <model-viewer
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
              />
              <SmokeEffect />
            </ModelContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

const ModelContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SmokeEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Evita interferencias con el modelo */
  background: url('https://www.transparenttextures.com/patterns/white-smoke.png');
  opacity: 0.4;
  animation: smokeAnimation 6s infinite;
  z-index: 1;

  @keyframes smokeAnimation {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
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
  align-items: center;

  &:hover {
    background-color: #006a22;
  }

  &:focus {
    outline: none;
    background-color: #006a22;
  }
`;
