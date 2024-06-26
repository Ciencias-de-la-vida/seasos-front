
import axios from 'axios'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'components/Nav/Sidebar';
import "../../styles/login.css";
import { Heading } from 'components';
import Swal from 'sweetalert2';


export const Login = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate()

  const handleToggleDarkMode = (newMode) => {
    setDarkMode(newMode);
  };

  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignIn = () => {
    setIsSigningUp(false);
  }

  const handleSignUp = () => {
    setIsSigningUp(true);
  }


  const [credentials, setCredentials] = useState({
    correo: '',
    contrasena: ''
  })

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: ''
  })

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })

    setForm({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }



  const login = async (e) => {
    try {
      const response = await axios.post('https://api-rest-python-six.vercel.app/login', credentials);
      if (response.status == 200) {
        localStorage.setItem("isLogged", true)
        await Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: '¡Bienvenido!'
        });
        navigate("/animalT")
      } else {
        localStorage.setItem("isLogged", false)
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al iniciar sesión'
        });
      }
    } catch (err) {
      console.log(err)
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error al iniciar sesión: ${err.response.data.message}`
      });
    }
  }


  const register = async (e) => {
    try {
      const { data } = await axios.post(`https://api-rest-python-six.vercel.app/post/users`, form)
      if (data) {
        const response = await Swal.fire({
          icon: 'success',
          title: 'Te registraste con exito!!',
          text: 'La solicitud entrará en un proceso para admitirte...\n Ingresa en un periodo de 24 horas!',
          showConfirmButton: true
        });
        if (response.isConfirmed) {
          window.location.reload();
        }
      }
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err
      });
    }
  }

  return (
    <div>
      <Sidebar onToggleDarkMode={handleToggleDarkMode} />

      <div className="containerL">
        <div className="form-box">
          <Heading
            size="md"
            as="h2"
            className="w-[100%] mt-4 text-center"
            style={{
              fontSize: "40px",
              marginBottom: isSigningUp ? "" : "-25px",
            }}
          >
            {isSigningUp ? 'Registro' : 'Inicio de Sesión'}
          </Heading>
          <form>
            <div className="input-group d-flex align-items-center justify-content-center">

              <div className="input-field" style={{ maxHeight: isSigningUp ? '65px' : '0', overflow: 'hidden', transition: 'max-height 0.5s' }} id="nameField">
                <i className="fa fa-user"></i>
                <input onChange={handleChange} name='nombre' type="text" placeholder=" Nombre" />
              </div>

              <div className="input-field" style={{ maxHeight: isSigningUp ? '65px' : '0', overflow: 'hidden', transition: 'max-height 0.5s' }} id="lastNameField">
                <i className="fa fa-user"></i>
                <input onChange={handleChange} name='apellido' type="text" placeholder=" Apellido" />
              </div>

              <div className="input-field">
                <i className="fa fa-envelope"></i>
                <input onChange={handleChange} name='correo' type="email" placeholder=" Email" />
              </div>

              <div className="input-field">
                <i className="fa fa-lock"></i>
                <input onChange={handleChange} name='contrasena' type="password" placeholder=" Contraseña" />
              </div>

            </div>
            <div className="btn-fieldR">
              {isSigningUp ?
                <button onClick={register} type="button" id="submitBtn"> Registrarse </button> :
                <button onClick={login} type="button" id="submitBtn"> Iniciar Sesión </button>
              }
            </div>
            <div className="btn-field">
              <button type="button" id="signinBtn" className={isSigningUp ? 'disable' : ''} onClick={handleSignIn}>Iniciar Sesión</button>
              <button type="button" id="signupBtn" className={isSigningUp ? '' : 'disable'} onClick={handleSignUp}>Registro</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}