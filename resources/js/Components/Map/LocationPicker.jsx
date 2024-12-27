import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MapEvents from './MapEvents';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationPicker = ({ positions, setPositions }) => {
    useEffect(() => {
        // Initialize Leaflet icons
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    const handleLocationClick = (latlng) => {
        const newPositions = [...positions, latlng];
        if (newPositions.length > 2) newPositions.shift();
        setPositions(newPositions);
    };

    return (
        <div className="w-full h-[400px]">
            <MapContainer 
                center={[-6.902299276649465, 107.61870197987594]} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {positions.map((pos, idx) => (
                    <Marker key={idx} position={pos} />
                ))}
                <MapEvents onLocationClick={handleLocationClick} />
            </MapContainer>
        </div>
    );
};

export default LocationPicker;