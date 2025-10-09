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
  ChevronDown,
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import LanguageSwitcher from '../language-switcher';

const getShortAddress = (address, wordCount = 10) => {
  if (!address) return '';
  const words = address.split(' ');
  if (words.length <= wordCount) return address;
  return words.slice(0, wordCount).join(' ') + ' ...';
};

const Navbar = ({ dictionary, currentLocale }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAddressTooltip, setShowAddressTooltip] = useState(false);
  const navDict = dictionary.navigation || {};
  const contactInfo = dictionary.contact_info || {};

  const mainNavLinks = [
    {
      name: navDict.home,
      href: `/${currentLocale}`,
    },
    {
      name: navDict.solutions,
      isDropdown: true,
      items: [
        {
          name: navDict.products,
          href: `/${currentLocale}/products`,
        },
        {
          name: navDict.rental,
          href: `/${currentLocale}/rental`,
        },
        { name: navDict.parts, href: `/${currentLocale}/spare-parts` },
        {
          name: navDict.trade_in,
          href: `/${currentLocale}/trade-in`,
        },
      ],
    },
    {
      name: navDict.services,
      isDropdown: true,
      items: [
        {
          name: navDict.service_support,
          href: `/${currentLocale}/service`,
        },
        {
          name: navDict.repair_premium,
          href: `/${currentLocale}/repair-packages`,
        },
      ],
    },
    {
      name: navDict.about_thei,
      isDropdown: true,
      items: [
        {
          name: navDict.company_profile,
          href: `/${currentLocale}/about`,
        },
        {
          name: navDict.news,
          href: `/${currentLocale}/news`,
        },
        {
          name: navDict.career_training,
          href: `/${currentLocale}/career`,
        },
        {
          name: navDict.branches,
          href: `/${currentLocale}/branches`,
        },
      ],
    },
    {
      name: navDict.promotions,
      href: `/${currentLocale}/promotions`,
    },
    { name: navDict.contact, href: `/${currentLocale}/contact` },
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
              <div
                className="flex items-center space-x-2 relative"
                onMouseEnter={() => setShowAddressTooltip(true)}
                onMouseLeave={() => setShowAddressTooltip(false)}
              >
                <MapPin size={16} />
                <span className="cursor-pointer">
                  {getShortAddress(contactInfo.address)}
                </span>
                {showAddressTooltip && (
                  <div className="absolute left-0 top-full mt-2 z-50 bg-black text-white text-xs rounded px-4 py-2 shadow-lg whitespace-pre-line max-w-xs">
                    {contactInfo.address}
                  </div>
                )}
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
                  href="https://www.facebook.com/"
                  aria-label="Facebook"
                  className="hover:opacity-70 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/tjmheavyequipment/"
                  aria-label="Instagram"
                  className="hover:opacity-70 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@tjmheavyequipment_"
                  aria-label="TikTok"
                  className="hover:opacity-70 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok size={18} />
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
              className="bg-yellow-400 p-2 hover:bg-yellow-500 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        <div className="w-full h-[5px] bg-yellow-400"></div>
      </div>

      {/* Backdrop dengan blur */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Slide Menu dari Kanan */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white border-l-4 border-yellow-400 transition-transform duration-300 ease-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header Menu */}
        <div className="px-4 flex w-full justify-between items-center h-[60px] border-b-2 border-gray-200">
          <Link
            href={`/${currentLocale}`}
            className="flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="bg-yellow-400 px-3 py-1">
              <span className="text-black font-extrabold text-xl tracking-wider">
                THEI
              </span>
            </div>
            <div className="bg-black px-2 py-1">
              <span className="text-white font-bold text-xl">ID</span>
            </div>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-60px)]">
          <nav className="space-y-2">
            {mainNavLinks.map((link, idx) =>
              link.isDropdown ? (
                <div key={link.name}>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === idx ? null : idx)
                    }
                    className="w-full text-left px-4 py-3 text-black font-bold text-lg hover:bg-yellow-400 hover:text-black rounded-lg transition-all flex justify-between items-center group"
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${
                        openDropdown === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Items */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openDropdown === idx ? 'max-h-96 mt-1' : 'max-h-0'
                    }`}
                  >
                    {link.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block pl-8 pr-4 py-2 text-gray-700 hover:text-black hover:bg-yellow-100 rounded-lg transition-colors font-semibold"
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
                  className="block px-4 py-3 text-black font-bold text-lg hover:bg-yellow-400 rounded-lg transition-all"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
