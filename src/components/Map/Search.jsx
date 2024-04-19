import { SearchIcon } from "assets/images/SearchIcon";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Popover, Overlay } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Search = ({location}) => {
  const [animal, setAnimal] = useState("");
  const [resultado, setResultado] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const [resultadoCards, setResultadoCards] = useState([]);
  const [target, setTarget] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const getAnimals = async () => {
        
    }
    getAnimals();
}, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`https://api-rest-python-six.vercel.app/get/animals/${animal}`);
      setResultadoCards(results);
      setShowPopover(false)
  } catch (error) {
      console.log(error);
  }
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    console.log(value);
    setAnimal(value);
    if (value.length >= 2) {
      try {
        const results = await axios.get(`https://api-rest-python-six.vercel.app/get/animals/${animal}`);
        setResultadoCards(results);
        setShowPopover(false)
        if (results.data) {
          setResultado(results.data);
          setTarget(e.target)
          setShowPopover(true)
        }
        
    } catch (error) {
        console.log(error);
        setResultado([]);
        setShowPopover(false);
    }
      
  }
}


  return (
    <>
      <Container className="container" id="containerBuscador" style={{ maxWidth: "1600px", padding: "0" }}>
        <form className="formBusca mb-4 mt-4" onSubmit={handleSearch}>
          <div className="search-box">
            <input
              type="search"
              className="text-center"
              placeholder="Busca tu proximo destino aquí"
              value={animal}
              onChange={handleSearchChange}
            />
          </div>
          <div className="submit-box">
            <button className="btnBuscar d-flex align-items-center justify-content-center" type="submit"></button>
          </div>
        </form>
        </Container>
        <div className="popover-container" style={{ display: showPopover ? "block" : "none" }}>
          <div className="popover-content">
            {resultado.map((item, index) => (
               <a key={index} className="buscadorPopover" href={`/animal/?id=${item._id}`} style={{textDecoration: "none"}} 
               onClick={(event) => {
                 event.preventDefault();
                 navigate(`/animal/${item._id}`);
               }}>
              <div className="d-flex align-items-center mt-2" id="busqueda" >
                <img src={item.img} alt="" style={{width: "20%", height: "20%"}} /> 
              <h1 className="ms-2 mt-2" style={{color: 'black', fontSize: "14px", fontWeight: "bold", textAlign: "center", textDecoration:"none"}}>{item.nombre}</h1>
              </div>
              </a>
            ))}
          </div>
        </div>
    </>
  );
};