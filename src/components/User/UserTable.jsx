import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "components/Nav/Sidebar";
import { Heading } from "components";
import Swal from "sweetalert2";

export const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const itemsPerPage = 10;

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://api-rest-python-six.vercel.app/get/users"
      );
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleToggleDarkMode = (newMode) => {
    setDarkMode(newMode);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.put(
        `https://api-rest-python-six.vercel.app/update/users/${id}`,
        { status: newStatus }
      );
      getUsers();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Deseas eliminar este registro?",
        text: "No será posible revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, elimínalo!",
      });

      // If confirmed, proceed with deletion
      if (result.isConfirmed) {
        await axios.delete(
          `https://api-rest-python-six.vercel.app/delete/users/${id}`
        );
        getUsers();
        // Show success message
        Swal.fire({
          title: "Eliminado!",
          text: "Tu registro se ha eliminado exitosamente",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
    setShowEditForm(true);
  };

  const handleEditFormSubmit = async (editedUserData) => {
    try {
      await axios.put(
        `https://api-rest-python-six.vercel.app/update/users/${editingUser._id}`,
        editedUserData
      );
      setShowEditForm(false);
      getUsers();
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

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

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) {
      // Verificar que el valor esté dentro del rango válido
      value = Math.min(Math.max(value, 1), totalPages);
      setInputPage(value);
    }
  };

  const handleInputBlur = () => {
    // Actualizar la página actual cuando el input pierde el foco
    setCurrentPage(inputPage);
  };

  return (
    <div className="pb-5" style={{ backgroundColor: darkMode ? "#1E1E1E" : "white" }} >
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar onToggleDarkMode={handleToggleDarkMode} />
          </div>
          <div className="col-md-10 " id="containerTable">
          <Heading size="md" as="h2" className="w-[100%] text-center mt-3 mb-2" id="titleAnimals" style={{ color: darkMode ? "white" : "black" }}>
              Usuarios Registrados
            </Heading>
            <div className="table-container">
              <table className={`table table-hover  ${!darkMode ? "table-striped" : "table-striped table-dark"} text-center`} >
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Estado</th>
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
                          className={`btn ${user.status ? "btn-success" : "btn-danger"
                            }`}
                          onClick={() => toggleStatus(user._id, user.status)}
                        >
                         <i className={`fa ${user.status ? "fa-check-circle" : "fa-ban"
                            } mx-2`}></i> {user.status ? "Activo" : "Inactivo"}
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => editUser(user)}
                        >
                          <i className="fa fa-pen mx-2"></i>Editar
                        </button>
                        <button
                          className="btn btn-danger mt-2"
                          onClick={() => deleteUser(user._id)}
                        >
                          <i className="fa fa-trash mx-2"></i>Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-5">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  <h3>
                    <i className="bi bi-arrow-left-square" style={{ color: darkMode ? "white" : "black" }}></i>
                  </h3>
                </button>
                <input
                  className='inputClassPagination'
                  type="number"
                  max={totalPages}
                  value={inputPage} // Establecer el valor como inputPage
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      // Verificar que el valor esté dentro del rango válido
                      value = Math.min(Math.max(value, 0), totalPages);
                      setCurrentPage(value); // Actualizar currentPage
                      setInputPage(value); // Actualizar inputPage
                    }
                  }}
                  onBlur={() => setCurrentPage(inputPage)} // Actualizar currentPage cuando el input pierde el foco
                  style={{ width: "80px", textAlign: "right", color: darkMode ? "white" : "black", fontWeight: "bolder", marginBottom: "6px" }}
                />
                <Heading
                  size="xs"
                  as="h2"
                  className="w-[20%] text-center mt-1 mb-2"
                  id="paginacion"
                  style={{ width: "80px", textAlign: "right", color: darkMode ? "white" : "black" }}
                >
                  de {totalPages}
                </Heading>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <h3><i className="bi bi-arrow-right-square" style={{ color: darkMode ? "white" : "black" }}></i></h3>
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
    </div>
  );
};

const EditForm = ({ user, onSubmit, onClose }) => {
  const [editedUserData, setEditedUserData] = useState({
    nombre: user.nombre,
    apellido: user.apellido,
    correo: user.correo,
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
    <div
      className="container fixed z-50 inset-0 overflow-y-auto"
      style={{ backgroundColor: "white" }}
    >
      <div className="edit-form ">
        <h2>Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={editedUserData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              name="apellido"
              value={editedUserData.apellido}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo
            </label>
            <input
              type="email"
              className="form-control"
              id="correo"
              name="correo"
              value={editedUserData.correo}
              onChange={handleChange}
            />
          </div>
          <div className="text-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-dark">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddUserForm = ({ onClose, getUsers }) => {
  const [newUserData, setNewUserData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://api-rest-python-six.vercel.app/post/users", {
        nombre: newUserData.nombre,
        apellido: newUserData.apellido,
        correo: newUserData.correo,
        contrasena: newUserData.contraseña, // Ajusta aquí
      });
      onClose();
      getUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div
      className="container fixed z-50 inset-0 overflow-y-auto"
      style={{ backgroundColor: "white" }}
    >
      <div className="add-user-form">
        <h2>Agregar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={newUserData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              name="apellido"
              value={newUserData.apellido}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo
            </label>
            <input
              type="email"
              className="form-control"
              id="correo"
              name="correo"
              value={newUserData.correo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="contraseña"
              name="contraseña"
              value={newUserData.contraseña}
              onChange={handleChange}
            />
          </div>
          <div className="text-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-dark">
              Agregar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
