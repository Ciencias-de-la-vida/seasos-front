import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const MyIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function DrawLayer({ onMarkerAdd }) {
  const handleClick = (e) => {
    const newMarker = L.marker(e.latlng);
    onMarkerAdd(newMarker); // Pasar referencia del marcador
  };

  useMapEvents({
    click: handleClick,
  });

  return null;
}

export const MapForm = ({ onLatLngChange, darkMode }) => {
  const [marker, setMarker] = useState(null);

  const handleMarkerAdd = (marker) => {
    setMarker(marker);
    console.log(marker);
    if (marker) {
      const latLng = marker.getLatLng();
      console.log(latLng);
      onLatLngChange(latLng); // Enviar latLng al componente padre
    }
  };

  return (
    <MapContainer center={[0, 0]} zoom={3} style={{ height: '200px', width: '300px' }}>
       <TileLayer
          url={!darkMode ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"}
          attribution={!darkMode ? "&copy; OpenStreetMap contributors" : "&copy; CartoDB"}
        />
      <DrawLayer onMarkerAdd={handleMarkerAdd} />
      {marker && <Marker position={marker.getLatLng()} icon={MyIcon} />}
    </MapContainer>
  );
};
