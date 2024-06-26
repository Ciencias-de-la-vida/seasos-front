import React, { useState } from 'react';
import axios from 'axios';
import { Sidebar } from 'components/Nav/Sidebar';
import { MapForm } from './MapForm';
import { Heading } from 'components';
import { uploadFiles } from '../../../firebase/config';
import Swal from 'sweetalert2';
import { color } from 'framer-motion';

export const Form = () => {
  const [inputType, setInputType] = useState('file');
  const [latLng, setLatLng] = useState(null);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("")
  const [darkMode, setDarkMode] = useState(false);
  const backgroundImageStyle = {
    backgroundImage: darkMode ?
      "url(https://images.pexels.com/photos/2832767/pexels-photo-2832767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" :
      "url(https://images.pexels.com/photos/4221755/pexels-photo-4221755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
    backgroundPosition: "center",
    objectFit: "contain",
    backgroundSize: "cover",
    position: "relative"
  };


  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const result = await uploadFiles(file);
        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Imagen Subida!!',
            text: "Tu imagen fue subida con exito, sigue con el formulario...",
          });
          setImg(result);
        }
      } else {
        throw new Error('Se debe seleccionar una imagen');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  const handleToggleDarkMode = (newMode) => {
    setDarkMode(newMode);
  };

  const vaciarInputs = () => {
    document.getElementById('form').reset();
    setLatLng(null);
    setFile(null);
    setImg("");
  };

  const handleInputChange = (e) => {
    setInputType(e.target.value);
  };

  const handleLatLngChange = (latLng) => {
    setLatLng(latLng);
  };

  const postAnimal = async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('form1').value;
    const cientifico = document.getElementById('form2').value;
    const region = document.getElementById('form3').value;
    const lat = latLng?.lat;
    const lng = latLng?.lng;
    const imageUrl = inputType === 'file' ? img : document.getElementById('formUrl').value;

    let errorMessage = '';

  if (!nombre) {
    errorMessage += 'Por favor ingresa el nombre del animal.\n';
  }
  if (!cientifico) {
    errorMessage += 'Por favor ingresa el nombre científico del animal.\n';
  }
  if (!region) {
    errorMessage += 'Por favor ingresa la región donde se ubica el animal.\n';
  }
  if (!lat || !lng) {
    errorMessage += 'Por favor selecciona la ubicación del animal en el mapa.\n';
  }
  if (!imageUrl) {
    errorMessage += 'Por favor selecciona o ingresa una imagen del animal.\n';
  }

  if (errorMessage) {
    // Mostrar alerta por cada campo faltante
    errorMessage.split('\n').forEach((message) => {
      if (message.trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message.trim(),
        });
      }
    });
    return;
  }
    try {
      const newAnimal = {
        nombre,
        cientifico,
        region,
        latitud: lat,
        longitud: lng,
        img: imageUrl,
        status: true,
      };

      const { data } = await axios.post('https://api-rest-python-six.vercel.app/post/animals', newAnimal);

      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Petición enviada \n En los proximos dias los administradores aprobaran o rechazaran tu petición!',
          showConfirmButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            vaciarInputs();
          } else {
            vaciarInputs();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Hubo un problema al enviar la petición',
        });
      }
    } catch (error) {
      console.error(error);
      vaciarInputs();
    }
  };

  return (
    <>
      <Sidebar onToggleDarkMode={handleToggleDarkMode} />
      <div id='containerF'  style={backgroundImageStyle}>
      <div className='container'  >
      <div className='row justify-content-center'>
          <div className='col-lg-8' >
            <div className='card my-2 rounded-3' style={{ width: '80vh', backgroundColor: darkMode ? "black": "white" }}>
              <img
                src= {darkMode ? 'https://images.pexels.com/photos/1618606/pexels-photo-1618606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' : 'https://images.pexels.com/photos/986805/pexels-photo-986805.jpeg'}
                className='card-img-top rounded-top'
                alt='Sample photo'
              />
              <Heading size="xs" as="h2" className="w-[100%] text-center mt-3 mb-2" id="soliTitle" style={{fontSize: "25px", color: darkMode? "white": "black"}}>
                        Solicitud de nueva especie
                    </Heading>
              <div className='card-body px-5'>
              <div className="container">
                <form id='form'>
                  <div className='row mb-3'>
                    <div className='col'>
                      <input type='text' className='form-control' id='form1' placeholder='Nombre de la especie' required />
                    </div>
                    <div className='col'>
                      <input type='text' className='form-control' id='form2' placeholder='Nombre cientifico' required />
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col'>
                      <input type='text' className='form-control' id='form3' placeholder='Región donde se ubica' required />
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col'>
                      <label htmlFor='form4' className='form-label' style={{color: darkMode ? "white":"black"}}>
                        Latitud y Longitud
                      </label>
                      <div className='container'>
                        <MapForm onLatLngChange={handleLatLngChange} darkMode={darkMode} />
                      </div>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col'>
                      <label htmlFor='form6' className='form-label' style={{color: darkMode ? "white":"black"}}>
                        Imagen de la especie
                      </label>
                      <select className='form-select mb-2' id='form6' onChange={handleInputChange}>
                        <option value='file'>Subir archivo</option>
                        <option value='url'>Insertar URL</option>
                      </select>
                      {inputType === 'file' ? (
                        <>
                          <input
                           type="file"
                           className="form-control"
                           id="form5"
                           onChange={(e) => setFile(() => e.target.files[0])}
                           accept=".png, .jpg, .jpeg"
                          />
                          <div className="d-grid gap-2">
                          <button className={`btn ${darkMode ? "btn-primary": "btn-dark"} mt-2 `} onClick={(e) => uploadImage(e)}>
                            <i className="fa fa-file mx-2"></i>Subir Imagen
                          </button>
                          </div>
                        </>
                      ) : (
                        <input type='url' className='form-control' id='formUrl' placeholder='Insertar URL' />
                      )}
                    </div>
                  </div>
                  <div className='d-grid gap-2'>
                    <button className='btn btn-success' onClick={postAnimal}>
                      <i className='fa fa-send me-2'></i>Enviar petición
                    </button>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
