'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Map, MapPin as MapPinIcon, Phone } from 'lucide-react';

// FIX: Konfigurasi ikon kustom untuk Leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const InteractiveMap = ({ dictionary }) => {
  const [activeBranch, setActiveBranch] = useState(null);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef({});

  // Center peta di tengah Indonesia
  const mapCenter = [-2.548926, 118.0148634];

  useEffect(() => {
    if (activeBranch && cardRefs.current[activeBranch.id]) {
      const card = cardRefs.current[activeBranch.id];
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeBranch]);

  if (!dictionary || !dictionary.branches) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Kolom Peta Leaflet */}
          <div className="relative w-full h-[65vh] bg-gray-100 rounded-lg overflow-hidden">
            <MapContainer
              center={mapCenter}
              zoom={5}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {dictionary.branches.map((branch) => (
                <Marker
                  key={branch.id}
                  position={[branch.coords.lat, branch.coords.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => {
                      setActiveBranch(branch);
                    },
                  }}
                >
                  <Popup>
                    <b>{branch.city}</b>
                    <br />
                    {branch.address}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          {/* Kolom Daftar Cabang */}
          <div
            ref={scrollContainerRef}
            className="w-full h-[65vh] overflow-y-auto space-y-4 pr-4"
          >
            {dictionary.branches.map((branch) => (
              <div
                key={branch.id}
                ref={(el) => (cardRefs.current[branch.id] = el)}
                className={`p-6 border rounded-lg transition-all duration-300 cursor-pointer ${
                  activeBranch?.id === branch.id
                    ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                onClick={() => setActiveBranch(branch)}
              >
                <h3 className="font-bold text-lg text-black">{branch.city}</h3>
                <p className="text-sm text-gray-600 mt-2">{branch.address}</p>
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <a
                    href={branch.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <MapPinIcon size={16} /> Lihat di Google Maps
                  </a>
                  <a
                    href={`tel:${branch.phone}`}
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Phone size={16} /> {branch.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
