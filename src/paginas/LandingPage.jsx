import React, { useState } from 'react';
import sound from '/assets/chiverito.mp3';
import styled from 'styled-components';
import backgroundImage from '../assets/fondofinal.png';
import nombreapellido from '../assets/nombreapellido.png';
import celular from '../assets/celular.png';
import cuenta from '../assets/instagram.png';
import ciudad from '../assets/ciudad.png';
import btnenviar from '../assets/btnenviar.png';
import regalo from '../assets/regalo.png';
import base from '../assets/base.png';
import logoImage from '../assets/logoImage.png';
import parteImage from '../assets/parteImage.png';



const LandingPage = () => {

  const [enviadoExitosamente, setEnviadoExitosamente] = useState(false);
 // const history = useHistory();
  const [formData, setFormData] = useState({
    nombres: '',
    celular: '',
    cuenta: '',// Valor predeterminado
    ciudad: '', 
    animacion: 0
  });
  var source = "";
  var source2 = "";

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const codigo = params.get('animacion');
  const paso = params.get('paso');
  console.log("animacion numero: "+codigo);


  if(codigo == 1){
    source = "./assets/guachosaco.glb";
    source2 = "./assets/guachosaco.usdz";
  }else if(codigo == 2){
    source = "./assets/guachosorpresa.glb";
    source2 = "./assets/guachosorpresa.usdz";
  }else if(codigo == 3){
    source = "./assets/guachocarta.glb";
    source2 = "./assets/guachocarta.usdz";
  }else if(codigo == 4){
    source = "./assets/guachitoarbol.glb";
    source2 = "./assets/guachitoarbol.usdz";
  }

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleAudio = () => {
    const audioElement = document.getElementById('myAudio');
  
    if (isAudioPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) =>  {
    e.preventDefault();

    // Validación de campos (puedes personalizar esto según tus necesidades)
    if (!formData.nombres || !formData.celular || !formData.cuenta || !formData.ciudad) {
      alert('Todos los campos son obligatorios');
      return;
    }else{
      try {
        // Envío de datos al servidor
        console.log("entra al envio");
        formData.animacion = codigo;
        const response = await fetch('https://app.cotzul.com/Otros/registroloteria.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        // Verificar la respuesta del servidor
        if (response.ok) {
          setEnviadoExitosamente(true);
          window.location.href = '?animacion='+codigo+"&paso=1";
          //history.push('https://navidadextraordinaria-loteria.netlify.app/?animacion=5');
          // Puedes manejar la respuesta del servidor aquí, por ejemplo, redirigiendo a otra página
         // history.push('/pagina-limpia');
  
        } else {
          // Manejar errores de respuesta del servidor
          console.log("ingreso al error");
         
        }
      } catch (error) {
        // Manejar errores de red o del lado del cliente
        console.error('Error de red o del lado del cliente', error);
        
      }
    }

    


    // Aquí puedes realizar acciones adicionales con los datos del formulario
    // Por ahora, simplemente redireccionamos a una página limpia
  };

  return (
    
      <>
      {(enviadoExitosamente || paso == 1)?((codigo!=null)?
        (<div style={{
          background: `url(${backgroundImage}) repeat fixed center center / cover`,
          height: '100%',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
      <img
        src={logoImage}
        alt="Logo"
        style={{ width: '100vw' }}
      />
      </div>
        <h1 style={{ textAlign: 'center', color: '#FFF' }}>¡Envío Exitoso!</h1>
        <p style={{ textAlign: 'center', color: '#FFF'  }}>Gracias por registrarte. Tomate la foto con Guachito y súbelo a tu Instagram.</p>
        <div className="App" style={{ width: '100%', height: '100%' }}>
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
        >


          <Boton slot="ar-button">
            Ingresa
          </Boton>
        </model-viewer>
      </div>
      </div></div>):(<div></div>)):((codigo!=null)?(<div style={{
        background: `url(${backgroundImage}) repeat fixed center center / cover`,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}><div
       
    ><form style={{ // Ajusta el ancho del formulario según tus necesidades
      padding: '0px',
      backgroundColor: 'rgba(255, 255, 255, 0)', // Fondo semi-transparente para mayor legibilidad
    }} onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
      <img
        src={logoImage}
        alt="Logo"
        style={{ width: '100vw' }}
      />
      </div>
      <div style={{ marginBottom: '20px' }}>
      <img
        src={parteImage}
        alt="parteImage"
        style={{ width: '100vw'}}
      />
      </div>
      <div style={{ position: 'relative', marginBottom: '20px' }}>
          <img src={nombreapellido} alt="Nombres y Apellidos" style={{ width: '100vw' }} />
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0)',
              position: 'absolute',
              bottom: '0',
              left: '12%', // Ajusta la posición del campo de entrada en la imagen
              right: '12%', // Ajusta la posición del campo de entrada en la imagen
              width: '80%', // Ajusta el ancho del campo de entrada en la imagen
              border: 'none', // Elimina el borde
              outline: 'none', // Elimina el contorno de enfoque
              fontSize: '2em'
            }}
          />
        </div>
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <img src={celular} alt="Celular" style={{ width: '100vw' }} />
          <input
            type="tel"
            name="celular"
            value={formData.celular}
            onChange={handleInputChange}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0)',
              position: 'absolute',
              bottom: '0',
              left: '12%', // Ajusta la posición del campo de entrada en la imagen
              width: '80%', // Ajusta el ancho del campo de entrada en la imagen
              border: 'none', // Elimina el borde
              outline: 'none', // Elimina el contorno de enfoque
              fontSize: '2em'
            }}
          />
        </div>
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <img src={cuenta} alt="Cuenta" style={{ width: '100vw' }} />
          <input
            type="text"
            name="cuenta"
            value={formData.cuenta}
            onChange={handleInputChange}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0)',
              position: 'absolute',
              bottom: '0',
              left: '12%', // Ajusta la posición del campo de entrada en la imagen
              width: '80%', // Ajusta el ancho del campo de entrada en la imagen
              border: 'none', // Elimina el borde
              outline: 'none', // Elimina el contorno de enfoque
              fontSize: '2em'
            }}
          />
        </div>
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <img src={ciudad} alt="Ciudad" style={{ width: '100vw' }} />
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleInputChange}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0)',
              position: 'absolute',
              bottom: '0',
              left: '12%', // Ajusta la posición del campo de entrada en la imagen
              width: '80%', // Ajusta el ancho del campo de entrada en la imagen
              border: 'none', // Elimina el borde
              outline: 'none', // Elimina el contorno de enfoque
              fontSize: '2em'
            }}
          />
        </div>
        <img
          src={btnenviar}
          alt="Enviar"
          style={{ cursor: 'pointer', width: '100vw', marginBottom: '350px' }}
          onClick={handleSubmit}
        />
       
      
      </form></div></div>):(<div></div>))}
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
alignItems: 'center',

&:hover {
  background-color: #006a22;
}

&:focus {
  outline: none;
  background-color: #006a22;
}
`;
