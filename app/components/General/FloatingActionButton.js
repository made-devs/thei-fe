'use client';
import React from 'react';
import Link from 'next/link';
import { MessageCircle, MapPin, Phone, FileText } from 'lucide-react';

const FloatingActionButton = ({ dictionary, currentLocale }) => {
  const fabDict = dictionary.hero || {};
  const contactInfo = dictionary.contact_info || {};

  // Membersihkan nomor telepon untuk tautan `tel:`
  const telLink = `tel:${(contactInfo.whatsapp_display || '').replace(
    /\s/g,
    ''
  )}`;

  return (
    <>
      {/* Desktop FAB */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col shadow-2xl">
        <Link
          href={`/${currentLocale}/contact`}
          className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 flex flex-col items-center min-w-[80px] transition-colors group"
        >
          <FileText size={20} className="mb-1" />
          <span
            className="text-xs font-bold leading-tight text-center"
            dangerouslySetInnerHTML={{
              __html: (fabDict.fab_quote || '').replace(' ', '<br/>'),
            }}
          />
        </Link>
        <Link
          href={`/${currentLocale}/branches`}
          className="bg-gray-800 hover:bg-gray-700 text-white p-3 flex flex-col items-center min-w-[80px] transition-colors"
        >
          <MapPin size={20} className="mb-1" />
          <span
            className="text-xs font-bold leading-tight text-center"
            dangerouslySetInnerHTML={{
              __html: (fabDict.fab_location || '').replace(' ', '<br/>'),
            }}
          />
        </Link>
        <a
          href={telLink}
          className="bg-gray-800 hover:bg-gray-700 text-white p-3 flex flex-col items-center min-w-[80px] transition-colors"
        >
          <Phone size={20} className="mb-1" />
          <span className="text-xs font-bold leading-tight text-center">
            {contactInfo.whatsapp_display}
          </span>
        </a>
        <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 flex flex-col items-center min-w-[80px] transition-colors">
          <MessageCircle size={20} className="mb-1" />
          <span
            className="text-xs font-bold leading-tight text-center"
            dangerouslySetInnerHTML={{
              __html: (fabDict.fab_live_chat || '').replace(' ', '<br/>'),
            }}
          />
        </button>
      </div>

      {/* Mobile FAB */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden shadow-2xl">
        <Link
          href={`/${currentLocale}/contact`}
          className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 flex flex-col items-center w-1/4 transition-colors group"
        >
          <FileText size={20} className="mb-1" />
          <span className="text-xs font-bold leading-tight text-center">
            {fabDict.fab_mobile_quote}
          </span>
        </Link>
        <Link
          href={`/${currentLocale}/branches`}
          className="bg-gray-800 hover:bg-gray-700 text-white p-3 flex flex-col items-center w-1/4 transition-colors"
        >
          <MapPin size={20} className="mb-1" />
          <span className="text-xs font-bold leading-tight text-center">
            {fabDict.fab_mobile_location}
          </span>
        </Link>
        <a
          href={telLink}
          className="bg-gray-800 hover:bg-gray-700 text-white p-3 flex flex-col items-center w-1/4 transition-colors"
        >
          <Phone size={20} className="mb-1" />
          <span className="text-xs font-bold leading-tight text-center">
            {fabDict.fab_mobile_call}
          </span>
        </a>
        <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 flex flex-col items-center w-1/4 transition-colors">
          <MessageCircle size={20} className="mb-1" />
          <span className="text-xs font-bold leading-tight text-center">
            {fabDict.fab_mobile_chat}
          </span>
        </button>
      </div>
    </>
  );
};

export default FloatingActionButton;
