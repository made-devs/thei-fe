// app/components/Navbar.js

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import LanguageSwitcher from './language-switcher';

const Navbar = ({ dictionary, currentLocale }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavLinks = [
    { name: dictionary.equipment, href: '#' },
    { name: dictionary.parts, href: '#' },
    { name: dictionary.service, href: '#' },
    { name: dictionary.promotions, href: '#' },
    { name: dictionary.technology, href: '#' },
    { name: dictionary.industries, href: '#' },
  ];

  const topNavLinks = [
    { name: dictionary.about, href: '#' },
    { name: dictionary.career, href: '#' },
    { name: dictionary.training, href: '#' },
    { name: dictionary.eprocurement, href: '#' },
  ];

  return (
    <div className="w-full bg-white relative">
      {/* --- DESKTOP NAVBAR (lg:block) --- */}
      <div className="hidden lg:block">
        {/* Logo */}
        <div className="absolute left-0 right-0 top-0 bottom-0 z-20 pointer-events-none">
          <div className="max-w-[1440px] mx-auto relative h-full">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-auto">
              <div className="flex items-center">
                <div className="bg-yellow-400 px-4 py-2 rounded-l-md">
                  <span className="text-black font-bold text-xl">THEI</span>
                </div>
                <div className="bg-black px-3 py-2 rounded-r-md">
                  <span className="text-white font-bold text-xl">ID</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigasi Atas */}
        <div className="relative">
          <div className="max-w-7xl mx-auto flex items-stretch">
            <div className="flex-1"></div>
            <div className="relative w-20">
              <Image
                src="/bg-header.png"
                alt="header background"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-gray-200 py-2 px-6">
              <div className="flex justify-end items-center space-x-8 text-sm font-medium text-gray-700 h-full">
                <a href="#" className="hover:text-gray-900 transition-colors">
                  {dictionary.about}
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  {dictionary.career}
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  {dictionary.training}
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  {dictionary.eprocurement}
                </a>
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher currentLocale={currentLocale} />
                  <button className="p-1 hover:bg-gray-300 rounded">
                    <Search size={16} className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigasi Utama */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="w-48"></div> {/* Spacer */}
              <nav className="flex items-center space-x-8">
                {mainNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-800 font-semibold hover:text-yellow-500 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="flex items-center">
                <div className="w-px h-8 bg-gray-300 mx-4"></div>
                <button className="flex items-center space-x-2 text-gray-800 font-semibold hover:text-yellow-500 transition-colors">
                  <ShoppingCart size={20} />
                  <span>{dictionary.buy_parts}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-2 bg-yellow-400"></div>
      </div>

      {/* --- MOBILE HEADER (lg:hidden) --- */}
      <div className="lg:hidden">
        {/* FIX: Ganti flex dengan grid 3 kolom untuk centering yang sempurna */}
        <div className="mx-auto px-4 grid grid-cols-3 items-center h-[60px]">
          {/* Kolom Kiri */}
          <div className="flex justify-start">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="bg-yellow-400 p-2"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Kolom Tengah */}
          <div className="flex justify-center">
            <div className="flex items-center">
              <div className="bg-yellow-400 px-3 py-1">
                <span className="text-black font-extrabold text-lg tracking-wider">
                  THEI
                </span>
              </div>
              <div className="bg-black px-2 py-1">
                <span className="text-white font-bold text-lg">ID</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="flex justify-end items-center space-x-4">
            <LanguageSwitcher currentLocale={currentLocale} />
            <button className="text-black">
              <Search size={24} />
            </button>
          </div>
        </div>
        <div className="w-full h-[5px] bg-yellow-400"></div>
      </div>

      {/* --- MOBILE MENU (Fullscreen Overlay) --- */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col">
          <div className="mx-auto px-4 flex w-full justify-between items-center h-[60px] border-b">
            <div className="flex items-center">
              <div className="bg-yellow-400 px-3 py-1">
                <span className="text-black font-extrabold text-xl tracking-wider">
                  THEI
                </span>
              </div>
              <div className="bg-black px-2 py-1">
                <span className="text-white font-bold text-xl">ID</span>
              </div>
            </div>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow p-6 overflow-y-auto">
            <nav className="flex flex-col space-y-6 text-lg font-bold text-black">
              {mainNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <hr className="my-6" />
            <div className="flex flex-col space-y-6 text-md text-gray-700">
              {topNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
