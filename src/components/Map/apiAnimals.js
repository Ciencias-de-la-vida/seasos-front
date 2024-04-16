import React from 'react'
import axios from "axios"
const URL = "https://api-rest-python-six.vercel.app/get/animals"

export const apiAnimals = async() => {
  try {
    const listAnimals = await axios.get(`${URL}`)
    return listAnimals.data
  } catch (error) {
    console.log(error)
  } 
}
