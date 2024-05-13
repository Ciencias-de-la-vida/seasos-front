import React, { useEffect, useState, createContext } from "react";
import { useRoutes } from "react-router-dom";
import Landingpage from "pages/Landingpage";
import { Map } from "components/Map/Map";
import { Stats } from "pages/Stats"
import { Form } from "components/Forms/Forms";
import { Login } from "components/Forms/Login";
import { HeatMap } from "components/HeatMap/HeatMap";
import { Animal } from "components/Map/Animal";
import { AnimalTable } from "components/Animal/AnimalTable";
import { UserTable } from "components/User/UserTable";
import { UpdateAnimal } from "components/Forms/UpdateAnimal";
import { UpdateUser } from "components/Forms/UpdateUser";
import { element } from "prop-types";


const ProjectRoutes = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitud: 0,
    longitud: 0,
  });
  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ latitud: latitude, longitud: longitude });
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          console.error("La geolocalización no está disponible en este navegador.");
        }
      } catch (error) {
        console.error("Error al obtener la ubicación:", error);
      }
    };

    getLocation();
  }, []);

  let element = useRoutes([
    { path: "/", element: <Landingpage /> },
    { path: "/map", element: currentLocation ? <Map currentLocation={currentLocation} /> : <h1>Por favor, activa la opción de ubicación</h1>},
    { path: "/form", element: <Form/>},
    { path: "/login", element: <Login/>},
    {path:"/stats", element: <Stats/>},
    { path: "/animal/:id", element: <Animal/>},
    { path: "/animalT", element: <AnimalTable/>},
    { path: "/userT", element: <UserTable/>},
    { path: "/updateAnimal", element: <UpdateAnimal/>},
    { path: "/updateUser", element: <UpdateUser/>},
    { path: "/heatmap", element: currentLocation ? <HeatMap currentLocation={currentLocation} /> : <h1>Por favor, activa la opción de ubicación</h1>}
  ]);

  return element;
};

export default ProjectRoutes;
