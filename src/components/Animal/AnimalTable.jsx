import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from 'components/Nav/Sidebar';
import { Heading } from 'components';

export const AnimalTable = () => {
    const [animals, setAnimals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [darkMode, setDarkMode] = useState(false);
    const itemsPerPage = 10; // Número de animales por página

    const getAnimals = async () => {
        try {
            const { data } = await axios.get('https://api-rest-python-six.vercel.app/get/all_animals');
            setAnimals(data);
        } catch (error) {
            console.error('Error fetching animals:', error);
        }
    };

    const handleToggleDarkMode = (newMode) => {
        setDarkMode(newMode);
      };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = !currentStatus;
            await axios.put(`https://api-rest-python-six.vercel.app/update/animals/${id}`, { status: newStatus });
            getAnimals(); // Reload animals after update
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const deleteAnimal = async (id) => {
        try {
            await axios.delete(`https://api-rest-python-six.vercel.app/delete/animals/${id}`);
            getAnimals(); // Reload animals after deletion
        } catch (error) {
            console.error('Error deleting animal:', error);
        }
    };

    useEffect(() => {
        getAnimals();
    }, []);

    // Cálculo de índices de inicio y fin para la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAnimals = animals.slice(startIndex, endIndex);

    // Controladores de paginación
    const totalPages = Math.ceil(animals.length / itemsPerPage);

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
                    <Heading size="md" as="h2" className="w-[100%] text-center text-black mt-3 mb-2" id="titleAnimals">
                        Animales Registrados
                    </Heading>
                    <div className="table-responsive">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Img</th>
                                <th>Nombre</th>
                                <th>Científico</th>
                                <th>Latitud</th>
                                <th>Longitud</th>
                                <th>Región</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAnimals.map(animal => (
                                <tr key={animal._id}>
                                    <td><img src={animal.img} alt={animal.nombre} style={{width: "150px", borderRadius: "10px"}} /></td>
                                    <td>{animal.nombre}</td>
                                    <td>{animal.cientifico}</td>
                                    <td>{animal.latitud}</td>
                                    <td>{animal.longitud}</td>
                                    <td>{animal.region}</td>
                                    <td>
                                        <button
                                            className={`btn ${animal.status ? 'btn-success' : 'btn-danger'}`}
                                            onClick={() => toggleStatus(animal._id, animal.status)}
                                        >
                                            {animal.status ? 'Activo' : 'Inactivo'}
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/updateAnimal/${animal._id}`} className="btn btn-warning me-2">Editar</Link>
                                        <button className="btn btn-danger" onClick={() => deleteAnimal(animal._id)}>Eliminar</button>
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
            </div>
            </div>
        </div>
    );
};