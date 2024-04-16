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
}
from 'mdb-react-ui-kit';
import { Sidebar } from 'components/Nav/Sidebar';

export const Form =()=> {
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
              </MDBRow>
              <div className="d-flex align-items-center justify-content-center">
              <MDBBtn color='success' className='mb-4' size='lg'><i className="fa fa-send mx-2"></i>Enviar peticion</MDBBtn>
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
