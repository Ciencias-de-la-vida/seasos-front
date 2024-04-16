import React from 'react';
import { Marker } from 'react-leaflet';

const Marker = ({ animal }) => {
  const { location } = animal;

  return (
    <Marker position={[location.latitude, location.longitude]} />
  );
};

export default Marker;