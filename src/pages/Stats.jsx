import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { apiAnimals } from "../components/Map/apiAnimals";
import Plot from 'react-plotly.js';
import { Sidebar } from "../components/Nav/Sidebar";


export const Stats = () => {
    const [animals, setAnimals] = useState([])
    const [users, setUsers] = useState([]);

    const [darkMode, setDarkMode] = useState(false);
  
    const handleToggleDarkMode = (newMode) => {
      setDarkMode(newMode);
    };

    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          "https://api-rest-python-six.vercel.app/get/users"
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const getAnimals = async () => {
      try {
          const { data } = await axios.get('https://api-rest-python-six.vercel.app/get/all_animals');
          setAnimals(data);
      } catch (error) {
          console.error('Error fetching animals:', error);
      }
  };
      useEffect(() => {
        getAnimals()
      }, [])

      useEffect(() => {
        getUsers();
      }, []);


      const domainCounts = {};

      users.forEach(user => {
        const domain = user.correo.split('@')[1]; // Obtener el dominio del correo
        if (domainCounts[domain]) {
          domainCounts[domain]++;
        } else {
          domainCounts[domain] = 1;
        }
      });

      const countAnimalsByRegion = () => {
        const animalCounts = {};
        animals.forEach(animal => {
          if (animal.region in animalCounts) {
            animalCounts[animal.region] += 1;
          } else {
            animalCounts[animal.region] = 1;
          }
        });
        return animalCounts;
      };

      const countAnimalsByCoordinate = () => {
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
                coordinates: [latitud, longitud],
              };
            }
          }
        });
    
        return regionCounts;
      };

      function countVerifiedAnimals(animals) {
        let verifiedCount = 0;
        animals.forEach(animal => {
          if (animal.status === true) {
            verifiedCount++;
          }
        });
        return verifiedCount;
      }
      
      function countUnverifiedAnimals(animals) {
        let unverifiedCount = 0;
        animals.forEach(animal => {
          if (animal.status != true) {
            unverifiedCount++;
          }
          console.log(unverifiedCount)
        });
        return unverifiedCount;
      }

      function countVerifiedUsers(users) {
        let verifiedUsers = 0;
        users.forEach(user => {
          if (user.status === true) {
            verifiedUsers++;
          }
        });
        return verifiedUsers;
      }
      
      function countUnverifiedUsers(users) {
        let unverifiedUsers = 0;
        users.forEach(user => {
          if (user.status != true) {
            unverifiedUsers++;
          }
          console.log(unverifiedCount)
        });
        return unverifiedUsers;
      }
    
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
    
      const regionCounts = countAnimalsByCoordinate();

      const animalCountsByRegion = countAnimalsByRegion();

      const colors = ['rgba(31, 119, 180, 0.79)', 'rgba(127,	255,	212, 0.79)', 'rgba(44, 160, 44, 0.79)', 'rgba(214, 39, 40, 0.79)'];

      const total = Object.values(regionCounts).reduce((acc, region) => acc + region.count, 0);

      const percentages = Object.keys(regionCounts).map(region => ({
        region,
        percentage: (regionCounts[region].count / total) * 100,
      }));

      const verifiedCount = countVerifiedAnimals(animals);
      const unverifiedCount = countUnverifiedAnimals(animals);

      const verifiedUsers = countVerifiedUsers(users)
      const unverifiedUsers = countUnverifiedUsers(users)

      
  return (
<div className=' w-full flex' style={{ backgroundColor: darkMode ? "#1E1E1E" : "white", color: darkMode ? "white" : "black"}}>
    
    <Sidebar onToggleDarkMode={handleToggleDarkMode} />

        <div className='ml-20 mt-12 content-center justify-items-center text-center space-y-24' >
            <h2>Gráficos y estadisticas</h2>
        <Plot
            data={[
            {
                type: 'bar',
                x: Object.keys(animalCountsByRegion),
                y: Object.values(animalCountsByRegion),
                marker: {
                  color: darkMode ? 'rgb(	241,	194,	50)' : 'rgba(27, 10, 237, 0.49)',
                },
            }
            ]}
            layout={{
              width: 1200, 
              height: 600, 
              title: {
                  text: 'Distribución Geoespacial por Países',
                  font: { color: darkMode ? 'white' : 'black' }, 
                  bgcolor: darkMode ? '#1E1E1E' : 'white', 
              },
              paper_bgcolor: darkMode ? '#1E1E1E' : 'white', 
              plot_bgcolor: darkMode ? '#1E1E1E' : 'white', 
              font: {
                  color: darkMode ? 'white' : 'black' 
              }
            }}
        />
        <Plot
            data={[
            {
                type: 'bar',
                x: Object.keys(regionCounts),
                y: Object.values(regionCounts).map(region => region.count),
                marker: {
                    color: colors,
                },
            }
            ]}
            layout={{ 
              width: 600, 
              height: 600, 
              title: {
                  text: 'Distribución Geoespacial por Coordenadas',
                  font: { color: darkMode ? 'white' : 'black' }, 
                  bgcolor: darkMode ? '#1E1E1E' : 'white', 
              },
              paper_bgcolor: darkMode ? '#1E1E1E' : 'white', 
              plot_bgcolor: darkMode ? '#1E1E1E' : 'white', 
              font: {
                  color: darkMode ? 'white' : 'black' 
              }
             }}
        />
        <Plot
          data={[
            {
              type: 'pie',
              labels: percentages.map(item => item.region),
              values: percentages.map(item => item.percentage),
              marker:{
                color: colors,
              },
            }
          ]}
          layout={{ 
            width: 600, 
              height: 600, 
              title: {
                  text: 'Porcentaje de Distribución Geoespacial',
                  font: { color: darkMode ? 'white' : 'black' }, 
                  bgcolor: darkMode ? '#1E1E1E' : 'white', 
              },
              paper_bgcolor: darkMode ? '#1E1E1E' : 'white',
              plot_bgcolor: darkMode ? '#1E1E1E' : 'white', 
              font: {
                  color: darkMode ? 'white' : 'black' 
              }
           }}
        />
        <Plot data={[
          {
            x: ['Animales'],
            y: [verifiedCount],
            type: 'bar',
            name: 'Activos',
          },
          {
            x: ['Animales'],
            y: [unverifiedCount],
            type: 'bar',
            name: 'Inactivos',
          },
        ]} 
        layout={{
          width: 1200,
          height: 800,
          barmode: 'stack', 
          yaxis: { title: 'Cantidad' },
          
              title: {
                  text: 'Estado de Verificación de Animales',
                  font: { color: darkMode ? 'white' : 'black' }, 
                  bgcolor: darkMode ? '#1E1E1E' : 'white', 
              },
              paper_bgcolor: darkMode ? '#1E1E1E' : 'white',
              plot_bgcolor: darkMode ? '#1E1E1E' : 'white',
              font: {
                  color: darkMode ? 'white' : 'black' 
              }
        }} />

<Plot data={[
          {
            x: ['Usuarios'],
            y: [verifiedUsers],
            type: 'bar',
            name: 'Activos',
          },
          {
            x: ['Usuarios'],
            y: [unverifiedUsers],
            type: 'bar',
            name: 'Inactivos',
          },
        ]} 
        layout={{
          width: 1200,
          height: 400,
          barmode: 'stack', 
          yaxis: { title: 'Cantidad' },
          
              title: {
                  text: 'Usuarios activos',
                  font: { color: darkMode ? 'white' : 'black' }, 
                  bgcolor: darkMode ? '#1E1E1E' : 'white', 
              },
              paper_bgcolor: darkMode ? '#1E1E1E' : 'white',
              plot_bgcolor: darkMode ? '#1E1E1E' : 'white',
              font: {
                  color: darkMode ? 'white' : 'black' 
              }
        }} />

        <Plot
            data={[
            {
                type: 'bar',
                x: Object.keys(domainCounts),
                y: Object.values(domainCounts),
                marker: {
                  color: darkMode ? 'rgb(	241,	194,	50)' : 'rgba(27, 10, 237, 0.49)',
                },
            }
            ]}
            layout={{
              width: 1200, 
              height: 600, 
              title: {
                  text: 'Correos más utilizados por los usuarios ',
                  font: { color: darkMode ? 'white' : 'black' }, 
                  bgcolor: darkMode ? '#1E1E1E' : 'white', 
              },
              paper_bgcolor: darkMode ? '#1E1E1E' : 'white', 
              plot_bgcolor: darkMode ? '#1E1E1E' : 'white', 
              font: {
                  color: darkMode ? 'white' : 'black' 
              }
            }}
        />

        </div>
    </div>
    

  );
}
