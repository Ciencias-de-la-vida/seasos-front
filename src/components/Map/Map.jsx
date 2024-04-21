import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { markersData } from "../../mocks/regions";
import { Sidebar } from "../Nav/Sidebar";
import { useNavigate } from "react-router-dom";
import { apiAnimals } from "./apiAnimals";
import { Search } from "./Search";
import { Toaster, toast } from "sonner";


export const MyIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const Map = ({ currentLocation }) => {
const [animals, setAnimals] = useState([])
const latitud = currentLocation && currentLocation.latitud ? currentLocation.latitud : 0;
const longitud = currentLocation && currentLocation.longitud ? currentLocation.longitud : 0;

  const fetchData = async()=>{
    try {
      const response = await apiAnimals()
      console.log(response)
      setAnimals(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  

  const navigate = useNavigate()
  console.log(currentLocation);
  if (!currentLocation || currentLocation.latitud === null || currentLocation.longitud === null) {
    return null;
  }

  const MapCenter = ({ center }) => {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  };

  useEffect(() => {
    const checkLocation = () => {
      if (!currentLocation || !currentLocation.latitud || !currentLocation.longitud) {
        toast.error("Permite acceder a tu ubicación para una mejor experiencia!!");
        console.log("Holi")
      }
    };
  
    checkLocation();
  
    const intervalId = setInterval(checkLocation, 5 * 60 * 1000);
  
    return () => clearInterval(intervalId);
  }, [currentLocation]);
  

  return (
    <>
    <div className="flex">
    <Toaster className="mx-4" richColors  expand={true}  />
    </div>
      <div style={{width: "50px", margin:"30px"} }>
            <Sidebar />
      </div>
        <div className="col-md-12" >
          
          <div style={{ display: "flex", height: "100vh", width: "100%" }}>
            <MapContainer center={[latitud, longitud]}
            zoom={latitud && longitud ? 15 : 2} style={{ flex: "1" }} zoomControl={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              <MapCenter center={[latitud, longitud]} />
Q
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
            <div className="search-container" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 1000 }}>
        <Search />
      </div>
          </div>
        </div>
    </>
  );
};
