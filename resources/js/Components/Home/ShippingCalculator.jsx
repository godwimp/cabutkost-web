import React from 'react';
import { FaMapMarkerAlt, FaDotCircle, FaWeightHanging, FaSearch } from 'react-icons/fa';
import { router } from '@inertiajs/react';

export const ShippingCalculator = ({ isMobile = false }) => {
  const handleSearch = () => {
    router.get('/rates');
  };

  const baseInputClass = `w-full focus:outline-none ${isMobile ? 'text-sm' : ''}`;
  
  return (
      <div className={isMobile ? "block mt-8" : ""}>
          <p className="font-semibold text-xl md:text-3xl mb-4 md:mb-6">
              Hitung Kiriman Anda
          </p>
          <div className="flex items-center border border-gray-500 rounded-xl p-3 mb-4">
              <FaMapMarkerAlt className="text-black mr-2" />
              <input
                  type="text"
                  placeholder="Lokasi Penjemputan"
                  className={baseInputClass}
              />
          </div>
          <div className="flex items-center border border-gray-500 rounded-xl p-3 mb-4">
              <FaDotCircle className="text-black mr-2" />
              <input
                  type="text"
                  placeholder="Lokasi Tujuan"
                  className={baseInputClass}
              />
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center border border-gray-500 rounded-xl p-3 mb-4">
                  <FaWeightHanging className="text-black mr-2" />
                  <input
                      type="text"
                      placeholder="Berat"
                      className={baseInputClass}
                  />
                  <span
                      className={`ml-2 text-gray-500 font-medium ${
                          isMobile ? "text-sm" : ""
                      }`}
                  >
                      KG
                  </span>
              </div>
              <button
                  onClick={handleSearch}
                  className="flex items-center justify-center w-full bg-gray-400 text-white p-3 rounded-xl mb-4"
              >
                  <FaSearch className="mr-2" />
                  <span className={isMobile ? "text-sm" : ""}>Search</span>
              </button>
          </div>
      </div>
  );
};