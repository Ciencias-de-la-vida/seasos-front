import { Heading, Text } from 'components';
import React, { useEffect, useState } from 'react'
import CountUp from "react-countup";
const Counter = ({ count, label }) => (
    <div className="flex flex-col items-center mt-2">
      <Heading size="lg" as="h3" className="font-poppins text-white" style={{ fontWeight: "bold", fontSize:"80px" }}><CountUp
      end={count} 
      duration = {5}/> </Heading>
      <Text size="sm" className="text-white" style={{ fontWeight: "normal", width:"25ch", textAlign: "center", fontSize:"18px" }}>{label}</Text>
    </div>
  );
export const Counters = () => {
    const [endangeredAnimalsCount, setEndangeredAnimalsCount] = useState(0);
    const [registeredAnimalsCount, setRegisteredAnimalsCount] = useState(0);
    const [appUsersCount, setAppUsersCount] = useState(0);
  
    useEffect(() => {
      setEndangeredAnimalsCount(15000);
      setRegisteredAnimalsCount(179);
      setAppUsersCount(3);
    }, []);
  return (
<div className="cards-container">
          <div className="card" style={{ backgroundColor: "#003366", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.479)", color: "white" }}>
            <Counter count={endangeredAnimalsCount} label="Animales en peligro de extinción" />
          </div>
          <div className="card" style={{ backgroundColor: "#004080", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.479)", color: "white" }}>
            <Counter count={registeredAnimalsCount} label="Animales registrados" />
          </div>
          <div className="card" style={{ backgroundColor: "#004d99", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.479)", color: "white" }}>
            <Counter count={appUsersCount} label="Usuarios registrados" />
          </div>
        </div>
  )
}
