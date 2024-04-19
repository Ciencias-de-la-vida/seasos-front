import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { apiAnimals } from 'components/Map/apiAnimals';
import { Sidebar } from "components/Nav/Sidebar";

export const HeatMap = ({ currentLocation }) => {
  const [animals, setAnimals] = useState([]);

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

  const getColor = (distance) => {
    if (distance <= 1000) {
      return "yellow";
    } else if (distance <= 9000) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <>
    <Sidebar/>
    <div style={{ height: '100vh' }}>
      <MapContainer center={[currentLocation.latitud, currentLocation.longitud]} zoom={2} style={{ height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

        {animals.map((animal, index) => {
          const { latitud, longitud } = animal;
          const distance = Math.sqrt((latitud - currentLocation.latitud) ** 4 + (longitud - currentLocation.longitud) ** 4);

          return (
            <Circle
              key={index}
              center={[latitud, longitud]}
              radius={800000}
              pathOptions={{ color: getColor(distance), opacity: 0 }}
            />
          );
        })}
      </MapContainer>
    </div>
    </>
  );
};

