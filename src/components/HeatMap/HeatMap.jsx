import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { apiAnimals } from 'components/Map/apiAnimals';
import { Sidebar } from "components/Nav/Sidebar";

export const HeatMap = ({ currentLocation }) => {
  const [animals, setAnimals] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

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
    if (count >= 30) {
      return darkMode ? "purple" : "darkred"; // Más de 5 animales
    } else if (count >= 15) {
      return darkMode ? "pink" : "orange"; // Entre 3 y 4 animales
    } else {
      return darkMode ? "blue" : "yellow"; // Menos de 3 animales
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
        } else {
          regionCounts[region] = {
            count: 1,
            coordinates: [latitud, longitud], // Asigna las coordenadas de la región
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

  return (
    <>
      <Sidebar onToggleDarkMode={handleToggleDarkMode} />
      <div  style={{ padding: '10px', textAlign: 'center', backgroundColor: 'white', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
          <div className="gap-5" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: 'red', marginRight: '10px' }}></div>
              Más de 30 animales
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              Entre 15 y 29 animales
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: 'yellow', marginRight: '10px' }}></div>
              Menos de 15 animales
            </div>
          </div>
        </div>
      <div style={{ height: '100vh' }}>
        <MapContainer center={[currentLocation.latitud, currentLocation.longitud]} zoom={2} zoomControl={false} style={{ height: '100%' }}>
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
                radius={80}
                pathOptions={{ color, opacity: 0.7, fillOpacity: 0.5 }}
              >
                <Tooltip>{`${region}: ${count} animal(es)`}</Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>
        
      </div>
      
    </>
  );
};
