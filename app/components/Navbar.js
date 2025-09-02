'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from 'lucide-react';
import LanguageSwitcher from './language-switcher';

const Navbar = ({ dictionary, currentLocale }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sesuaikan dengan halaman yang sudah ada
  const mainNavLinks = [
    { name: dictionary.equipment, href: `/${currentLocale}/equipment` },
    { name: dictionary.parts, href: `/${currentLocale}/parts` },
    { name: dictionary.service, href: `/${currentLocale}/service` },
    { name: dictionary.promotions, href: `/${currentLocale}/promotions` },
    { name: dictionary.trade_in, href: `/${currentLocale}/trade-in` },
  ];

  // Sesuaikan dengan halaman yang sudah ada
  const topNavLinks = [
    { name: dictionary.about, href: `/${currentLocale}/about` },
    { name: dictionary.branches, href: `/${currentLocale}/branches` },
  ];

  return (
    <div className="w-full bg-white relative">
      {/* --- DESKTOP NAVBAR (lg:block) --- */}
      <div className="hidden lg:block">
        {/* Navigasi Atas - Ditambahkan relative z-30 */}
        <div className="bg-yellow-400 text-sm font-medium relative z-30">
          <div className="max-w-[1440px] mx-auto flex justify-between items-stretch h-12">
            {/* Info Kontak */}
            <div className="flex-grow flex items-center space-x-6 px-6 text-black">
              <a
                href="tel:(888)880-8880"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Phone size={16} />
                <span>(888) 880-8880</span>
              </a>
              <a
                href="mailto:example@example.com"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Mail size={16} />
                <span>example@example.com</span>
              </a>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>2464 Royal Ln. Mesa, New Jersey 45463</span>
              </div>
            </div>
            {/* Sosmed & Bahasa - Reworked for stacking context */}
            <div className="relative flex items-center text-yellow-400">
              {/* Background shape */}
              <div
                className="absolute inset-0 bg-black"
                style={{
                  clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)',
                }}
              ></div>
              {/* Content on top of the shape */}
              <div className="relative flex items-center space-x-4 pl-14 pr-8">
                <LanguageSwitcher currentLocale={currentLocale} />
                <div className="w-px h-5 bg-yellow-400 opacity-50"></div>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:opacity-70 transition-opacity"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="hover:opacity-70 transition-opacity"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:opacity-70 transition-opacity"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="hover:opacity-70 transition-opacity"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="hover:opacity-70 transition-opacity"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigasi Utama */}
        <div className="bg-white border-b border-gray-200 relative">
          <div className="max-w-[1440px] mx-auto px-6 h-[80px] flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${currentLocale}`} className="flex items-center">
              <div className="bg-yellow-400 px-4 py-2 rounded-l-md">
                <span className="text-black font-bold text-xl">THEI</span>
              </div>
              <div className="bg-black px-3 py-2 rounded-r-md">
                <span className="text-white font-bold text-xl">ID</span>
              </div>
            </Link>

            {/* Links Navigasi */}
            <nav className="flex items-center space-x-8">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-800 font-semibold hover:text-yellow-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Tombol Aksi */}
            <div className="flex items-center space-x-6">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search size={18} className="text-gray-700" />
              </button>
              <button className="flex items-center space-x-2 bg-yellow-400 text-black px-5 py-2.5 rounded font-semibold hover:bg-yellow-500 transition-colors">
                <ShoppingCart size={20} />
                <span>{dictionary.buy_parts}</span>
              </button>
            </div>
          </div>
        </div>
        {/* Garis kuning di bawah navigasi utama */}
        <div className="h-2 bg-yellow-400"></div>
      </div>

      {/* --- MOBILE HEADER (lg:hidden) --- */}
      <div className="lg:hidden">
        <div className="mx-auto px-4 grid grid-cols-3 items-center h-[60px]">
          <div className="flex justify-start">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="bg-yellow-400 p-2"
            >
              <Menu size={24} />
            </button>
          </div>
          <div className="flex justify-center">
            <Link href={`/${currentLocale}`} className="flex items-center">
              <div className="bg-yellow-400 px-3 py-1">
                <span className="text-black font-extrabold text-lg tracking-wider">
                  THEI
                </span>
              </div>
              <div className="bg-black px-2 py-1">
                <span className="text-white font-bold text-lg">ID</span>
              </div>
            </Link>
          </div>
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
            <Link href={`/${currentLocale}`} className="flex items-center">
              <div className="bg-yellow-400 px-3 py-1">
                <span className="text-black font-extrabold text-xl tracking-wider">
                  THEI
                </span>
              </div>
              <div className="bg-black px-2 py-1">
                <span className="text-white font-bold text-xl">ID</span>
              </div>
            </Link>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow p-6 overflow-y-auto">
            <nav className="flex flex-col space-y-6 text-lg font-bold text-black">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <hr className="my-6" />
            <div className="flex flex-col space-y-6 text-md text-gray-700">
              {topNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
