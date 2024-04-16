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

export const UpdateUser =()=> {
    const navigate = useNavigate()
    const location = useLocation()
    const datos = location.state;
  
    const updateUser = async(e)=>{
    try {
      e.preventDefault()
      let updatedUser={
        nombre: document.getElementById('form1').value,
        apellido: document.getElementById('form2').value,
        correo: document.getElementById('form3').value,
      }
      const {data} = await axios.put(`https://api-rest-python-six.vercel.app/update/users/${datos._id}`, updatedUser)
      if(data){
        console.log("Usuario actualizado", data)
        navigate('/userT')
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
    <div className="col-md-9">
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='5'>
          <MDBCard className='my-2 rounded-3' style={{maxWidth: '1000px',}}>
            <MDBCardImage src='https://florayfaunamarina.com/wp-content/uploads/Flora-y-Fauna-marina.jpg' className='p-3 object-cover w-100 object-center'  alt="Sample photo"/>
            <MDBCardBody className='px-5'>
              <h3 className="mb-4 text-center">Actualización de datos</h3> 
              <MDBInput wrapperClass='mb-4' placeholder="Nombre" id='form1' type='text' defaultValue={datos.nombre} required/>
                <MDBCol size='md'>
                  <MDBInput wrapperClass=' mb-4' placeholder="Apellido" id='form2' type='text' defaultValue={datos.apellido} required/>
                </MDBCol>
                <MDBCol size='md'>
                  <MDBInput wrapperClass='mb-4' placeholder="Región donde se ubica" id='form3' type='text' defaultValue={datos.correo} required/>
                </MDBCol>
                <MDBCol className="d-flex align-items-center justify-content-center">
                    <button onClick={(e)=>updateUser(e)}>Actualizar</button>
                </MDBCol>
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