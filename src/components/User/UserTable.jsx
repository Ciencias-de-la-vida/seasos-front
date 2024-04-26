import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Sidebar } from 'components/Nav/Sidebar';
import { Heading } from 'components';

export const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [darkMode, setDarkMode] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const itemsPerPage = 10; // Número de usuarios por página

    const getUsers = async () => {
        try {
            const { data } = await axios.get('https://api-rest-python-six.vercel.app/get/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleToggleDarkMode = (newMode) => {
        setDarkMode(newMode);
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = !currentStatus;
            await axios.put(`https://api-rest-python-six.vercel.app/update/users/${id}`, { status: newStatus });
            getUsers(); // Reload animals after update
        } catch (error) {
            console.error('Error toggling status:', error);
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

    const editUser = (user) => {
        setEditingUser(user);
        setShowEditForm(true);
    };

    const handleEditFormSubmit = async (editedUserData) => {
        try {
            await axios.put(`https://api-rest-python-six.vercel.app/update/users/${editingUser._id}`, editedUserData);
            setShowEditForm(false);
            getUsers();
        } catch (error) {
            console.error('Error editing user:', error);
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
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar onToggleDarkMode={handleToggleDarkMode} />
                </div>
                <div className="col-md-10" id='containerTable'>
                    <Heading size="md" as="h2" className="text-center text-black mt-3 mb-2" id="titleAnimals">
                        Usuarios Registrados
                    </Heading>
                    <div className="table-container">
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
                                            <button
                                                className={`btn ${user.status ? 'btn-success' : 'btn-danger'}`}
                                                onClick={() => toggleStatus(user._id, user.status)}
                                            >
                                                {user.status ? 'Activo' : 'Inactivo'}
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning me-2" onClick={() => editUser(user)}>
                                                Editar
                                            </button>
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
                            <Heading size="xs" as="h2" className="w-[20%] text-center text-black mt-1 mb-2" id="paginacion">
                                Página {currentPage} de {totalPages}
                            </Heading>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                <h3><i className="bi bi-arrow-right-square"></i></h3>
                            </button>
                        </div>
                    </div>
                    {showEditForm && (
                        <EditForm
                            user={editingUser}
                            onSubmit={handleEditFormSubmit}
                            onClose={() => setShowEditForm(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const EditForm = ({ user, onSubmit, onClose }) => {
    const [editedUserData, setEditedUserData] = useState({
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({ ...editedUserData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editedUserData);
    };

    return (
        
        <div className="container fixed z-50 inset-0 overflow-y-auto" style={{backgroundColor: "white"}}>   
            <div className="edit-form ">
                <h2>Editar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" value={editedUserData.nombre} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input type="text" className="form-control" id="apellido" name="apellido" value={editedUserData.apellido} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="correo" name="correo" value={editedUserData.correo} onChange={handleChange} />
                    </div>
                    <div className="text-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
  
    );
};