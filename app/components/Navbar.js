'use client';

import React, { useState } from 'react';
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
  ChevronDown,
} from 'lucide-react';
import LanguageSwitcher from './language-switcher';

const Navbar = ({ dictionary, currentLocale }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navDict = dictionary.navigation || {};
  const contactInfo = dictionary.contact_info || {};

  const mainNavLinks = [
    { name: navDict.equipment, href: `/${currentLocale}/equipment` },
    { name: navDict.parts, href: `/${currentLocale}/parts` },
    { name: navDict.service, href: `/${currentLocale}/service` },
    { name: navDict.promotions, href: `/${currentLocale}/promotions` },
    { name: navDict.trade_in, href: `/${currentLocale}/trade-in` },
    {
      name: navDict.company,
      isDropdown: true,
      items: [
        { name: navDict.about_us, href: `/${currentLocale}/about` },
        { name: navDict.branches, href: `/${currentLocale}/branches` },
        {
          name: navDict.why_buy_forklift,
          href: `/${currentLocale}/why-buy-forklift`,
        },
        { name: navDict.news, href: `/${currentLocale}/news` },
      ],
    },
  ];

  return (
    <div className="w-full bg-white relative">
      {/* --- DESKTOP NAVBAR (lg:block) --- */}
      <div className="hidden lg:block">
        {/* Top Navigation */}
        <div className="bg-yellow-400 text-sm font-medium relative z-30">
          <div className="max-w-[1440px] mx-auto flex justify-between items-stretch h-12">
            <div className="flex-grow flex items-center space-x-6 px-6 text-black">
              <a
                href={`https://wa.me/${contactInfo.whatsapp_link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Phone size={16} />
                <span>{contactInfo.whatsapp_display} (WA)</span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Mail size={16} />
                <span>{contactInfo.email}</span>
              </a>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{contactInfo.address}</span>
              </div>
            </div>
            <div className="relative flex items-center text-yellow-400">
              <div
                className="absolute inset-0 bg-black"
                style={{
                  clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)',
                }}
              ></div>
              <div className="relative flex items-center space-x-4 pl-14 pr-8">
                <LanguageSwitcher currentLocale={currentLocale} />
                <div className="w-px h-5 bg-yellow-400 opacity-50"></div>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:opacity-70 transition-opacity"
                >
                  {' '}
                  <Facebook size={18} />{' '}
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="hover:opacity-70 transition-opacity"
                >
                  {' '}
                  <Twitter size={18} />{' '}
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:opacity-70 transition-opacity"
                >
                  {' '}
                  <Instagram size={18} />{' '}
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="hover:opacity-70 transition-opacity"
                >
                  {' '}
                  <Linkedin size={18} />{' '}
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="hover:opacity-70 transition-opacity"
                >
                  {' '}
                  <Youtube size={18} />{' '}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white border-b border-gray-200 relative">
          <div className="max-w-[1440px] mx-auto px-6 h-[80px] flex items-center justify-between">
            <Link href={`/${currentLocale}`} className="flex items-center">
              <div className="bg-yellow-400 px-4 py-2 rounded-l-md">
                <span className="text-black font-bold text-xl">THEI</span>
              </div>
              <div className="bg-black px-3 py-2 rounded-r-md">
                <span className="text-white font-bold text-xl">ID</span>
              </div>
            </Link>
            <nav className="flex items-center space-x-8">
              {mainNavLinks.map((link) =>
                link.isDropdown ? (
                  <div key={link.name} className="relative group">
                    <button className="text-gray-800 font-semibold hover:text-yellow-500 transition-colors flex items-center">
                      <span>{link.name}</span>
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-md shadow-lg z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                      <div className="py-2">
                        {link.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-gray-800 hover:bg-yellow-50 hover:text-black"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-800 font-semibold hover:text-yellow-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>
            <div className="flex items-center space-x-6">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search size={18} className="text-gray-700" />
              </button>
              <button className="flex items-center space-x-2 bg-yellow-400 text-black px-5 py-2.5 rounded font-semibold hover:bg-yellow-500 transition-colors">
                <ShoppingCart size={20} />
                <span>{navDict.buy_parts}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="h-2 bg-yellow-400"></div>
      </div>

      {/* --- MOBILE HEADER & MENU (lg:hidden) --- */}
      <div className="lg:hidden">
        <div className="mx-auto px-4 grid grid-cols-3 items-center h-[60px]">
          <div className="flex justify-start">
            <LanguageSwitcher currentLocale={currentLocale} />
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
          <div className="flex justify-end items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="bg-yellow-400 p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        <div className="w-full h-[5px] bg-yellow-400"></div>
      </div>

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
              {mainNavLinks.map((link) =>
                link.isDropdown ? (
                  <div key={link.name}>
                    <span className="text-gray-500">{link.name}</span>
                    <div className="flex flex-col space-y-4 mt-2 pl-4">
                      {link.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-black font-semibold"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
