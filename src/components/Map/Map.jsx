import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { markersData } from "../../mocks/regions";
import { Sidebar } from "../Nav/Sidebar";
import { useNavigate } from "react-router-dom";
import { apiAnimals } from "./apiAnimals";

export const Map = ({ currentLocation }) => {
const [animals, setAnimals] = useState([])

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
  const maxBounds = [
    [-200,0],
    [200,0]
  ]

  return (
    <>
     
    <div className="flex">
      <div style={{width: "50px", margin:"30px"} }>
            <Sidebar />
      </div>
        <div className="col-md-12" >
          <div style={{ display: "flex", height: "100vh", width: "100%" }}>
            <MapContainer center={[currentLocation.latitud, currentLocation.longitud]}
            maxBounds={maxBounds} zoom={2} style={{ flex: "1" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              <MapCenter center={[currentLocation.latitud, currentLocation.longitud]} />

              {animals.map((marker, index) => (
                <Marker key={index} position={[marker.latitud, marker.longitud]}>
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
          </div>
        </div>
      </div>
    </>
  );
};
