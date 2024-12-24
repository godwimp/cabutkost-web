import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectLokasi = ({ value, onChange, placeholder }) => {
    const [locations, setLocations] = useState([]);
    const [search, setSearch] = useState(value?.label || '');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`/api/lokasi?search=${search}`);
                // Akses data array dari response.data.data
                const formattedLocations = response.data.data.map(location => ({
                    value: location.id,
                    label: `${location.nama_kecamatan} (${location.kodepos})`,
                }));
                setLocations(formattedLocations);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchLocations();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [search]);

    useEffect(() => {
        if (value?.label) {
            setSearch(value.label);
        }
    }, [value]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
        setIsOpen(true);
        if (value) {
            onChange(null);
        }
    };

    const handleSelectLocation = (location) => {
        onChange(location);
        setSearch(location.label);
        setIsOpen(false);
    };

    const handleInputFocus = () => {
        setIsOpen(true);
        if (search === '') {
            const fetchInitialLocations = async () => {
                try {
                    const response = await axios.get('/api/lokasi');
                    // Akses data array dari response.data.data
                    const formattedLocations = response.data.data.map(location => ({
                        value: location.id,
                        label: `${location.nama_kecamatan} (${location.kodepos})`,
                    }));
                    setLocations(formattedLocations);
                } catch (error) {
                    console.error('Error fetching initial locations:', error);
                }
            };
            fetchInitialLocations();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.location-select')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="relative location-select">
            <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder={placeholder}
                value={search}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
            />
            {isOpen && locations.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {locations.map((location) => (
                        <div
                            key={location.value}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectLocation(location)}
                        >
                            {location.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectLokasi;
