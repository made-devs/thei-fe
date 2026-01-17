'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin as MapPinIcon, Phone } from 'lucide-react';

// FIX: Konfigurasi ikon kustom untuk Leaflet agar tidak rusak di Next.js
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const activeIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png', // Ikon yang lebih besar atau beda warna
  iconSize: [35, 51], // Ukuran diperbesar
  iconAnchor: [17, 51],
  popupAnchor: [1, -44],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [51, 51],
});

const InteractiveMap = ({ dictionary }) => {
  const [activeBranch, setActiveBranch] = useState(null);
  const cardRefs = useRef({});
  const mapRef = useRef(null);

  // Center peta di tengah Indonesia
  const mapCenter = [-2.548926, 118.0148634];

  useEffect(() => {
    if (activeBranch && mapRef.current) {
      // Animasi peta terbang ke lokasi pin yang aktif
      mapRef.current.flyTo(
        [activeBranch.coords.lat, activeBranch.coords.lng],
        9,
        {
          animate: true,
          duration: 1, // Durasi animasi 1 detik
        }
      );
    }

    // Scroll list ke kartu yang aktif
    if (activeBranch && cardRefs.current[activeBranch.id]) {
      const card = cardRefs.current[activeBranch.id];
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeBranch]);

  if (!dictionary || !dictionary.branches) return null;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
            {dictionary.title}
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Kolom Peta Leaflet */}
          <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[65vh] bg-gray-100 rounded-lg overflow-hidden shadow-md z-0">
            {' '}
            {/* Tambahkan z-0 untuk memastikan map di bawah navbar */}
            <MapContainer
              ref={mapRef}
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
                  // Ganti ikon jika pin sedang aktif
                  icon={
                    activeBranch?.id === branch.id ? activeIcon : defaultIcon
                  }
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
          <div className="w-full h-[50vh] sm:h-[60vh] lg:h-[65vh] overflow-y-auto space-y-4 sm:space-y-6 py-4 px-4">
            {' '}
            {/* Ubah pr-4 menjadi px-4 untuk padding simetris */}
            {dictionary.branches.map((branch) => (
              <div
                key={branch.id}
                ref={(el) => (cardRefs.current[branch.id] = el)}
                className={`p-4 sm:p-6 border rounded-lg transition-all duration-300 cursor-pointer ${
                  activeBranch?.id === branch.id
                    ? 'border-yellow-400 bg-yellow-50 shadow-lg scale-105' // Tambah scale untuk efek "pop"
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                onClick={() => setActiveBranch(branch)}
              >
                <h3 className="font-bold text-base sm:text-lg text-black text-center">
                  {' '}
                  {/* Tambahkan text-center untuk center judul */}
                  {branch.city}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-2 text-center">
                  {' '}
                  {/* Tambahkan text-center untuk center alamat */}
                  {branch.address}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
                  {' '}
                  {/* Tambahkan justify-center untuk center link */}
                  <a
                    href={branch.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <MapPinIcon size={16} /> Lihat di Google Maps
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
