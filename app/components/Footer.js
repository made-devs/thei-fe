// /app/components/Footer.js
import React from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = ({ dictionary, currentLocale }) => {
  const footerDict = dictionary.footer || {};
  const contactInfo = dictionary.contact_info || {};
  const companyLinks = footerDict.company_links || {};
  const solutionsLinks = footerDict.solutions_links || {};
  const currentYear = new Date().getFullYear();
  const copyrightText = (footerDict.copyright || '').replace(
    '{year}',
    currentYear
  );

  return (
    <footer className="bg-[var(--color-black)] text-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Kolom 1: Logo, Nama, Kontak */}
          <div className="lg:col-span-5 space-y-6">
            <Link href={`/${currentLocale}`} className="inline-block">
              <div className="flex items-center">
                <div className="bg-yellow-400 px-3 py-1.5 rounded-l-md">
                  <span className="text-black font-bold text-lg">THEI</span>
                </div>
                <div className="bg-black px-2.5 py-1.5 rounded-r-md">
                  <span className="text-white font-bold text-lg">ID</span>
                </div>
              </div>
            </Link>
            <h3 className="font-bold text-lg">{footerDict.company_name}</h3>
            <div className="text-gray-400 text-sm space-y-4">
              <p>{contactInfo.address}</p>
              <p>{contactInfo.whatsapp_display} (WhatsApp)</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="block hover:text-yellow-400"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>

          {/* Kolom 2 & 3: Links */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Company Links */}
              <div>
                <h4 className="font-bold text-sm mb-6">
                  {footerDict.company_links_title}
                </h4>
                <ul className="space-y-4 text-sm">
                  {Object.entries(companyLinks).map(([key, value]) => (
                    <li key={key}>
                      <Link
                        href={`/${currentLocale}/${key}`}
                        className="text-gray-400 hover:text-white"
                      >
                        {value}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Solutions Links */}
              <div>
                <h4 className="font-bold text-sm mb-6">
                  {footerDict.solutions_links_title}
                </h4>
                <ul className="space-y-4 text-sm">
                  {Object.entries(solutionsLinks).map(([key, value]) => (
                    <li key={key}>
                      <Link
                        href={`/${currentLocale}/${key}`}
                        className="text-gray-400 hover:text-white"
                      >
                        {value}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Social Media */}
              <div>
                <h4 className="font-bold text-sm mb-6">
                  {footerDict.follow_us}
                </h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
