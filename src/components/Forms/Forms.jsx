import React from 'react';
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

export const Form =()=> {
  const postAnimal = async(e)=>{
    try {
      e.preventDefault()
      let newAnimal={
        nombre: document.getElementById('form1').value,
        cientifico: document.getElementById('form2').value,
        region: document.getElementById('form3').value,
        latitud: document.getElementById('form4').value,
        longitud: document.getElementById('form5').value,
        img:  document.getElementById('form6').files[0],
        status: true
      }
      const {data} = await axios.post('https://api-rest-python-six.vercel.app/post/animals', newAnimal)
      
      if(data){
        console.log(data)
        console.log(data.message)
      }else{
        console.log(error)
      } 
    } catch (error) {
        console.error(error)
    }
  }
  return (
    <>
    <div className="row">
    <div className="col-md-2">
    <Sidebar/>
    </div>
    <div className="col-md-10" >
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='8'>
          <MDBCard className='my-2 rounded-3' style={{maxWidth: '500px',}}>
            <MDBCardImage src='https://florayfaunamarina.com/wp-content/uploads/Flora-y-Fauna-marina.jpg' className='w-100 rounded-top'  alt="Sample photo"/>
            <MDBCardBody className='px-5'>
              <h3 className="mb-4 text-center">Solicitud de animal</h3> 
              <MDBInput wrapperClass='mb-4' placeholder="Nombre del animal" id='form1' type='text' required/>
              <MDBRow>
                <MDBCol md='12'>
                  <MDBInput wrapperClass=' mb-4' placeholder="Nombre cientifico del animal" id='form2' type='text' required/>
                </MDBCol>
                <MDBCol md='12'>
                  <MDBInput wrapperClass='mb-4' placeholder="Región donde se ubica" id='form3' type='text' required/>
                </MDBCol>
                <MDBCol md='12'>
                  <h6>Latitud</h6>
                  <MDBRange placeholder="Latitud donde se ubica" name="form4" id='form4' type='range' min="-90" max="90" step="0.0001" required></MDBRange>
                </MDBCol>
                <MDBCol md='12' className='gy-3'>
                  <h6>Longitud</h6>
                  <MDBRange placeholder="Longitud donde se ubica" name="form5" id='form5' type='range' min="-180" max="180" step="0.0001" required></MDBRange>
                </MDBCol>
                <MDBCol md='12' className='gy-3'>
                  <h6 className='mb-2'>Imagen del animal</h6>
                  <MDBFile accept='image/*' name="form6" id='form6'></MDBFile>
                </MDBCol>
              </MDBRow>
              <div className="d-flex align-items-center justify-content-center">
                <button onClick={(e)=>postAnimal(e)}>Hola</button>
              <MDBBtn color='success' className='mb-4' size='lg'><i className="fa fa-send mx-2" onClick={(e)=>postAnimal(e)}></i>Enviar peticion</MDBBtn>
              </div>
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
