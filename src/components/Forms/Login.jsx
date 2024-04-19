
import axios from 'axios'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'components/Nav/Sidebar';
import "../../styles/login.css";
import { Heading } from 'components';


export const Login = () => {
  const navigate = useNavigate()

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
      console.log("STATUS", response.status)
      if (response.status == 200) {
        localStorage.setItem("isLogged", true)
        navigate("/animalT")
      } else {
        localStorage.setItem("isLogged", false)
      }
    } catch (err) {
      console.log(err)
      alert("Error al iniciar sesión: " + err.response.data.message);
    }
  }


  const register = async (e) => {
    try {
      const { data } = await axios.post(`https://api-rest-python-six.vercel.app/post/users`, form)
      alert(data.message)
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div>
      <Sidebar />

      <div className="containerL">
        <div className="form-box">
          <Heading
            size="md"
            as="h2"
            className="w-[90%] mt-4"
            style={{
              fontSize: "35px",
              marginBottom: isSigningUp ? "" : "-80px",
            }}
          >
            {isSigningUp ? 'Registro' : 'Inicio de Sesión'}
          </Heading>
          <form>
            <div className="input-group">

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

