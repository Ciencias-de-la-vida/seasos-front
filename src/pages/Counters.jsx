import axios from 'axios';
import { Heading, Text } from 'components';
import React, { useEffect, useState } from 'react'
import CountUp from "react-countup";
const Counter = ({ count, label }) => (
    <div className="flex flex-col items-center mt-4">
      <Heading size="lg" as="h3" className="font-poppins text-white" style={{ fontWeight: "bold", fontSize:"80px" }}><CountUp
      end={count} 
      duration = {5}/> </Heading>
      <Text size="sm" className="text-white" style={{ fontWeight: "normal", width:"25ch", textAlign: "center", fontSize:"18px" }}>{label}</Text>
    </div>
  );
export const Counters = () => {
    const [endangeredAnimalsCount, setEndangeredAnimalsCount] = useState(0);
    const [animals, setAnimals] = useState([]);
    const [registeredAnimalsCount, setRegisteredAnimalsCount] = useState(0);
    const [appUsersCount, setAppUsersCount] = useState(0);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
      try {
          const { data } = await axios.get('https://api-rest-python-six.vercel.app/get/users');
          setUsers(data);
      } catch (error) {
          console.error('Error fetching users:', error);
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
    getAnimals();
    getUsers();
}, []);

    useEffect(() => {
      setEndangeredAnimalsCount(15000);
      setRegisteredAnimalsCount(animals.length);
      setAppUsersCount(users.length);
    }, [animals, users]);
  return (
<div id="cards-container">
          <div id="card" style={{ backgroundColor: "#003366", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.479)", color: "white" }}>
            <Counter count={endangeredAnimalsCount} label="Animales en peligro de extinción" />
          </div>
          <div id="card" style={{ backgroundColor: "#004080", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.479)", color: "white" }}>
            <Counter count={registeredAnimalsCount} label="Animales registrados" />
          </div>
          <div id="card" style={{ backgroundColor: "#004d99", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.479)", color: "white" }}>
            <Counter count={appUsersCount} label="Usuarios registrados" />
          </div>
        </div>
  )
}
