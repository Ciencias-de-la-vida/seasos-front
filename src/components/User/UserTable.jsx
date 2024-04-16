import {React, useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Sidebar } from 'components/Nav/Sidebar'
import { UserT } from './UserT'
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

export const UserTable = ()=>{
    const [users, setUsers] = useState([])

    const getUsers = async ()=>{
        try {
            const {data} = await axios.get('https://api-rest-python-six.vercel.app/get/users') 
            setUsers(data)
            console.log("Usuarios", users)       
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id)=>{
        try {
            const {data} = await axios.delete(`https://api-rest-python-six.vercel.app/delete/users/${id}`)
            console.log("Usuario eliminado", data)
            getUsers()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {getUsers()}, [])
    return (
      <>
        <div className='row'>
            <div className='col-md-2'>
                <Sidebar/>
            </div>
            <div className='col-md-9'>
            <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg="8">
                <MDBCard className='my-10 rounded-3' style={{maxWidth: '1500px'}}>
                    <MDBCardBody>
                        <h2>Usuarios</h2>
                        <MDBTable responsive>
                            <MDBTableHead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    users.map(({_id, nombre, apellido, correo}, index)=>{
                                        return(
                                            <tr key={index}>
                                                <UserT
                                                    nombre={nombre}
                                                    apellido={apellido}
                                                    correo={correo}
                                                ></UserT>
                                                <td>
                                                    <MDBBtn color='warning'> <Link
                                                    to={'/updateUser'} 
                                                    state={{_id,nombre, apellido, correo}}>
                                                    Editar
                                                    </Link></MDBBtn>
                                                    <MDBBtn color='danger' onClick={()=> deleteUser(_id)}>Eliminar</MDBBtn>
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
