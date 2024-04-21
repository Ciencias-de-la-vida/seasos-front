import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Sidebar } from 'components/Nav/Sidebar';
import { Heading } from 'components';

export const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Número de usuarios por página

    const getUsers = async () => {
        try {
            const { data } = await axios.get('https://api-rest-python-six.vercel.app/get/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`https://api-rest-python-six.vercel.app/delete/users/${id}`);
            getUsers(); // Recargar usuarios después de eliminar
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // Cálculo de índices de inicio y fin para la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    // Controladores de paginación
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Heading size="md" as="h2" className="text-center text-black mt-3 mb-2">
                        Usuarios Registrados
                    </Heading>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.nombre}</td>
                                    <td>{user.apellido}</td>
                                    <td>{user.correo}</td>
                                    <td>
                                        <Link to={`/updateUser/${user._id}`} className="btn btn-warning me-2">
                                            Editar
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='d-flex align-items-center justify-content-center gap-2 mb-5'>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        <h3><i className="bi bi-arrow-left-square"></i></h3>
                        </button>
                        <Heading size="xs" as="h2" className="w-[20%] text-center text-black mt-1 mb-2">
                        Página {currentPage} de {totalPages}
                    </Heading>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <h3><i className="bi bi-arrow-right-square"></i></h3>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
