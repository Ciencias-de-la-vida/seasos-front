import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useTable, usePagination } from 'react-table'
import { AnimalT } from './AnimalT'
import { Sidebar } from 'components/Nav/Sidebar'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBBtn
} from 'mdb-react-ui-kit'

export const AnimalTable = ()=> {
    const [animals, setAnimals] = useState([])

    const getAnimals = async()=>{
        try {
            const {data} = await axios.get('https://api-rest-python-six.vercel.app/get/all_animals')
            setAnimals(data)
            console.log("Animales", animals)
        } catch (error) {
            console.log(error)
        }
    }

    const changeState = async (id, status)=>{
        try {
            let newStatus
            console.log(status)
            if (status == false){
                newStatus = true
            }else if(status == true){
                newStatus = false
            }
            console.log(newStatus)
            let updatedAnimal={
                status: newStatus
            }
            const {data} = await axios.put(`https://api-rest-python-six.vercel.app/update/animals/${id}`, updatedAnimal)
            if(data){
              console.log("Animal actualizado", data)
                getAnimals()
            }else{
              console.log(error)
            } 
        } catch (error) {
            console.error(error)
        }
    }

    const deleteAnimal = async (id)=>{
        try {
            const {data} = await axios.delete(`https://api-rest-python-six.vercel.app/delete/animals/${id}`)
            console.log("Animal deleted", data)
            getAnimals()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{getAnimals()}, [])
    return (
      <>
        <div className='row'>
            <div className='col-md-2'>
                <Sidebar/>
            </div>
            <div className='col-md-9'>
                <MDBContainer fluid>
                    <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol lg="12">
                        <MDBCard className='my-10 rounded-3' style={{maxWidth: '1500px'}}>
                            <MDBCardBody>
                                <h2 className='p-3'>Animales</h2>
                                <MDBTable responsive>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Científico</th>
                                            <th>Latitud</th>
                                            <th>Longitud</th>
                                            <th>Region</th>
                                            <th>Estatus</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {
                                            animals.map(({_id, nombre, cientifico, latitud, longitud, region, status, img}, index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <AnimalT
                                                            nombre={nombre}
                                                            cientifico={cientifico}
                                                            latitud={latitud}
                                                            longitud={longitud}
                                                            region={region}
                                                        >
                                                        </AnimalT>
                                                        <MDBBtn className={status ? 'bg-success border-success' : 'bg-danger border-danger'} onClick={()=>changeState(_id, status)}>
                                                            {
                                                            status ? <i>Activo</i> : <i>Inactivo</i>
                                                            }
                                                        </MDBBtn>
                                                        <td>
                                                            <MDBBtn color='warning'><Link to={'/updateAnimal'} state={{_id, nombre, cientifico, latitud, longitud, region, status}}>Editar</Link></MDBBtn>
                                                            <MDBBtn color='danger' onClick={()=>deleteAnimal(_id)}>Eliminar</MDBBtn>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
      </>
    )
}