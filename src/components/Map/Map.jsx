import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Sidebar } from "../Nav/Sidebar";
import { useNavigate } from "react-router-dom";
import { apiAnimals } from "./apiAnimals";
import { Search } from "./Search";
import { Toaster, toast } from "sonner";
import { Heading } from "components";
import Loader from "components/Loader/Loader";

export const Map = ({ currentLocation }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
  const [darkMode, setDarkMode] = useState(false);
  const latitud = currentLocation && currentLocation.latitud ? currentLocation.latitud : 0;
  const longitud = currentLocation && currentLocation.longitud ? currentLocation.longitud : 0;

  const iconUrl = darkMode
    ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png'
    : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';

  const MyIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const MyIcon2 = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const fetchData = async () => {
    try {
      const response = await apiAnimals();
      console.log(response);
      setAnimals(response);

      // Agregar un tiempo de espera adicional antes de cambiar loading a false
      setTimeout(() => {
        setLoading(false); // Cambia el estado a false una vez que los datos se han cargado
      }, 1000); // Cambia este valor (en milisegundos) según sea necesario
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  if (!currentLocation || currentLocation.latitud === null || currentLocation.longitud === null) {
    return null;
  }

  const handleToggleDarkMode = (newMode) => {
    setDarkMode(newMode);
  };

  const MapCenter = ({ center }) => {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  };

  useEffect(() => {
    const checkLocation = () => {
      if (!currentLocation || !currentLocation.latitud || !currentLocation.longitud) {
        toast.error("Permite acceder a tu ubicación para una mejor experiencia!!", {
          style: {
            padding: "20px"
          }
        });
      }
    };

    checkLocation();

    const intervalId = setInterval(checkLocation, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [currentLocation]);

  return (
    <>
      <div className="flex">
        <Toaster className="mx-4" richColors expand={true} />
      </div>
      <div style={{ width: "50px" }}>
        <Sidebar onToggleDarkMode={handleToggleDarkMode} />
      </div>
      <div className="col-md-12">
        <div style={{ display: "flex", height: "100vh", width: "100%" }}>
          {loading ? ( // Mostrar el Loader mientras los datos están siendo cargados
            <Loader />
          ) : (
            <MapContainer
              center={[latitud, longitud]}
              zoom={latitud && longitud ? 5 : 2}
              style={{ flex: "1" }}
              maxBounds={[
                [-90, -180], // Coordenadas del suroeste
                [90, 180], // Coordenadas del noreste
              ]}
              maxBoundsViscosity={1.0}
              zoomControl={false}
              maxZoom={15}
              minZoom={2}
            >
              <TileLayer
                url={!darkMode ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"}
                attribution={!darkMode ? "&copy; OpenStreetMap contributors" : "&copy; CartoDB"}
              />

              <MapCenter center={[latitud, longitud]} />
              {currentLocation && currentLocation.latitud !== null && currentLocation.longitud !== null && (
                <Marker position={[currentLocation.latitud, currentLocation.longitud]} icon={MyIcon2}>
                  <Popup>
                    <Heading size="xs" as="h2" className="text-center text-black mt-3 mb-2">
                      {currentLocation.latitud !== 0 ? `Ubicación actual\n (${latitud.toFixed(2)},${longitud.toFixed(2)})` : "Ubicación (0,0)"}
                    </Heading>
                  </Popup>
                </Marker>
              )}
              {animals.map((marker, index) => (
                <Marker key={index} position={[marker.latitud, marker.longitud]} icon={MyIcon}>
                  <Popup>
                    <h1 style={{ color: 'black', fontSize: "18px", fontWeight: "bold", textAlign: "center" }} className="mt-4">
                      <strong>{marker.nombre}</strong>
                    </h1>
                    <div className="d-flex justify-content-center align-items-center"><img src={marker.img} alt={marker.img} title={marker.country} style={{ width: "300px" }} />
                    </div>
                    <p className="text-center" style={{ fontSize: "12px" }}><strong>Nombre Cientifico:</strong> {marker.cientifico}</p>
                    <div className="d-flex justify-content-center align-items-center">
                      <a className="btn btn-primary"
                        onClick={(event) => {
                          event.preventDefault();
                          navigate(`/animal/${marker._id}`);
                        }} style={{ color: "white" }}> <i className="fa fa-info-circle mx-1"></i> Informacion de {marker.nombre} </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
          <div
            className="search-container"
            style={{
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
          >
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};
