import { Sidebar } from 'components/Nav/Sidebar'
import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { apiAnimals } from "./apiAnimals";
import "../../styles/animal.css";



export const Animal = () => {

  const { id } = useParams();
   console.log(id)
  const URL = `https://api-rest-python-six.vercel.app/get/animals`


  const [animals, setAnimals] = useState([])
  const[animal, setAnimal] = useState([])

  const fetchData = async()=>{
    try {
      const response = await apiAnimals()
      console.log(response)
      setAnimals(response)
      const animalEncontrado = response.find(animal => animal._id === id);
      setAnimal(animalEncontrado);
    } catch (error) {
      console.log(error)
    }
  }
  
  console.log(animal)

  useEffect(() => {
    fetchData()
  }, [])

   
  return (
    <>
      <div className="flex">
        
          <Sidebar />
        
          <div className="container mt-5">
      <div className="card-container">
        <div className="hero-image-container">
          <img src={animal.img} alt="Animal" />
          <div className="overlay"></div>
        </div>
        <div className="content">
          <h1>{animal.nombre}</h1>
          <h2>{animal.cientifico}</h2>
          <p>
            Región: {animal.region}
          </p>
          <p>
            Longitud: {animal.longitud}
          </p>
          <p>
            Latitud: {animal.latitud}
          </p>
        </div>
      </div>
    </div>
        </div>


        
      </>
      )
}
