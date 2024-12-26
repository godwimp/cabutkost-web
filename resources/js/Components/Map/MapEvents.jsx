import React from 'react';
import { useMapEvents } from 'react-leaflet';

const MapEvents = ({ onLocationClick }) => {
  useMapEvents({
    click(e) {
      if (onLocationClick) {
        onLocationClick(e.latlng);
      }
    }
  });
  
  return null;
};

export default MapEvents;