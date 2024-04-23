import {React, useState, useEffect} from 'react';
import {useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRange,
  MDBFile
}
from 'mdb-react-ui-kit';
import axios from 'axios';
import { Sidebar } from 'components/Nav/Sidebar';

export const UpdateAnimal =()=> {
    const location = useLocation()
    const datos = location.state
    const navigate = useNavigate()
    const [darkMode, setDarkMode] = useState(false);
  
    const updateAnimal = async(e)=>{
    try {
      e.preventDefault()
      let updatedAnimal={
        nombre: document.getElementById('form1').value,
        cientifico: document.getElementById('form2').value,
        region: document.getElementById('form3').value,
        latitud: document.getElementById('form4').value,
        longitud: document.getElementById('form5').value,
        img:  document.getElementById('form6').files[0],
        status: true
      }
      const {data} = await axios.put(`https://api-rest-python-six.vercel.app/update/animals/${datos._id}`, updatedAnimal)
      if(data){
        console.log("Animal actualizado", data)
        navigate('/animalT')
      }else{
        console.log(error)
      } 
    } catch (error) {
        console.error(error)
    }
  }

  const handleToggleDarkMode = (newMode) => {
    setDarkMode(newMode);
  };

  return (
    <>
    <div className="row">
    <div className="col-md-2">
    <Sidebar onToggleDarkMode={handleToggleDarkMode} />
    </div>
    <div className="col-md-9">
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='5'>
          <MDBCard className='my-2 rounded-3' style={{maxWidth: '1000px',}}>
            <MDBCardImage src='https://florayfaunamarina.com/wp-content/uploads/Flora-y-Fauna-marina.jpg' className='p-3 object-cover w-100 object-center'  alt="Sample photo"/>
            <MDBCardBody className='px-5'>
              <h3 className="mb-4 text-center">Actualización de datos</h3> 
              <MDBInput wrapperClass='mb-4' placeholder="Nombre del animal" id='form1' type='text' defaultValue={datos.nombre} required/>
              <MDBRow>
                <MDBCol size='md'>
                  <MDBInput wrapperClass=' mb-4' placeholder="Nombre cientifico del animal" id='form2' type='text' defaultValue={datos.cientifico} required/>
                </MDBCol>
                <MDBCol size='md'>
                  <MDBInput wrapperClass='mb-4' placeholder="Región donde se ubica" id='form3' type='text' defaultValue={datos.region} required/>
                </MDBCol>
                <MDBCol md='12'>
                  <h6>Latitud</h6>
                  <MDBRange placeholder="Latitud donde se ubica" name="form4" id='form4' type='range' min="-90" max="90" step="0.0001" defaultValue={datos.latitud} required></MDBRange>
                </MDBCol>
                <MDBCol md='12' className='gy-3'>
                  <h6>Longitud</h6>
                  <MDBRange placeholder="Longitud donde se ubica" name="form5" id='form5' type='range' min="-180" max="180" step="0.0001" defaultValue={datos.longitud} required></MDBRange>
                </MDBCol>
                <MDBCol md='12' className='gy-3'>
                  <h6 className='mb-2' /*Agregar el default value para la imagen*/>Imagen del animal</h6>
                  <MDBFile accept='image/*' name="form6" id='form6'></MDBFile>
                </MDBCol>
                <MDBCol className="d-flex align-items-center justify-content-center">
                    <button onClick={(e)=>updateAnimal(e)}>Actualizar</button>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
    </div>
    </>
  );
}