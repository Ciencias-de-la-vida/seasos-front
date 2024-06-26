import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { apiAnimals } from 'components/Map/apiAnimals';
import { Sidebar } from "components/Nav/Sidebar";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Modal } from "react-bootstrap";

export const HeatMap = ({ currentLocation }) => {
  const [animals, setAnimals] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRegionAnimals, setSelectedRegionAnimals] = useState(null);
  const [showModal, setShowModal] = useState(false)

  const handleToggleDarkMode = (newMode) => {
    setDarkMode(newMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiAnimals();
        setAnimals(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getColorByCount = (count) => {
    if (count >= 70) {
      return darkMode ? "purple" : "darkred";
    } else if (count >= 40) {
      return darkMode ? "pink" : "orange";
    } else {
      return darkMode ? "blue" : "yellow";
    }
  };

  const countAnimalsByRegion = () => {
    const regionCounts = {};

    animals.forEach((animal) => {
      const { latitud, longitud } = animal;
      const region = determineRegion(latitud, longitud);
      if (region) {
        if (regionCounts[region]) {
          regionCounts[region].count += 1;
          regionCounts[region].animals.push(animal); // Añadir el animal a la lista de la región
        } else {
          regionCounts[region] = {
            count: 1,
            coordinates: [latitud, longitud], // Asignar las coordenadas de la región
            animals: [animal], // Inicializar la lista de animales de la región
          };
        }
      }
    });

    return regionCounts;
  };

  const determineRegion = (latitud, longitud) => {
    if (latitud > 0 && longitud > 0) {
      return "Norte";
    } else if (latitud < 0 && longitud > 0) {
      return "Sur";
    } else if (latitud > 0 && longitud < 0) {
      return "Este";
    } else if (latitud < 0 && longitud < 0) {
      return "Oeste";
    } else {
      return null;
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar la modal
  };

  const handleShowAnimals = (regionAnimals) => {
    setSelectedRegionAnimals(regionAnimals);
    setShowModal(true); // Abrir la modal
  };
  return (
    <>
      <Sidebar onToggleDarkMode={handleToggleDarkMode} />
      <div style={{ padding: '10px', textAlign: 'center', backgroundColor: darkMode ? "black" : "white", boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
        <div id="infoColors" className="gap-5" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: darkMode ? "purple" : "darkred", marginRight: '10px', color: darkMode ? "white" : "black" }}></div>
            <span style={{
              color: darkMode ? "white" : "black"
            }}>
              Más de 70 especies
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: darkMode ? "pink" : "orange", marginRight: '10px', color: darkMode ? "white" : "black" }}></div>
            <span style={{
              color: darkMode ? "white" : "black"
            }}>
              Entre 40 a 70 especies
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: darkMode ? "blue" : "yellow", marginRight: '10px', color: darkMode ? "white" : "black" }}></div>
            <span style={{
              color: darkMode ? "white" : "black"
            }}>
              Menos de 40 especies
            </span>
          </div>
        </div>
      </div>
      <div style={{ height: '100vh' }}>
        <MapContainer center={[currentLocation.latitud, currentLocation.longitud]} zoom={2}
          maxBounds={[
            [-90, -180], // Coordenadas del suroeste
            [90, 180], // Coordenadas del noreste
          ]}
          maxZoom={2} minZoom={2} zoomControl={false} style={{ height: '100%' }}>
          <TileLayer
            url={!darkMode ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"}
            attribution={!darkMode ? "&copy; OpenStreetMap contributors" : "&copy; CartoDB"}
          />

          {Object.entries(countAnimalsByRegion()).map(([region, data], index) => {
            const { count, coordinates } = data;
            const color = getColorByCount(count);

            return (
              <CircleMarker
                key={index}
                center={coordinates}
                radius={150}
                pathOptions={{ color, opacity: 0.7, fillOpacity: 0.5 }}
              >
                <Popup
                >
                      <h3 className="text-center mb-3">{`${region}: ${count} especie(s)`}</h3>
                        <button className="btn btn-primary" onClick={() => handleShowAnimals(data.animals)}>Ver las especies de esta región</button>
                </Popup>
            </CircleMarker>
            )
          })}
        </MapContainer>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "28px", textAlign: "center", width: "100%" }}>Especies de la región</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {selectedRegionAnimals && selectedRegionAnimals.map((animal, index) => (
              <div key={index} className="mb-3" style={{ textAlign: "center", width: "100%" }}>
                <div className="d-flex align-items-center justify-content-center">
                <img src={animal.img} alt={animal.nombre} style={{ width: "80%" }} />
                </div>
                <p className="mt-2 text-black">{animal.nombre}</p>
                <p className="mb-5 text-black" style={{ fontStyle: "italic", marginTop: "-15px" }}>{animal.cientifico}</p>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    
    </>
  );
};
