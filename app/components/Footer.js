// /app/components/Footer.js
import React from 'react';
import Image from 'next/image';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = ({ dictionary }) => {
  // Pastikan dictionary dan propertinya ada sebelum digunakan
  const footerDict = dictionary.footer || {};
  const contactInfo = dictionary.contact_info || {};

  return (
    <footer className="bg-[var(--color-black)] text-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Kolom 1: Kontak & Info */}
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-sm mb-4">
                {footerDict.head_office}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {contactInfo.address}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">{footerDict.phone}</h4>
              <p className="text-gray-400 text-sm">
                {contactInfo.whatsapp_display} (WhatsApp)
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">{footerDict.email}</h4>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-gray-400 text-sm hover:text-yellow-400"
              >
                {contactInfo.email}
              </a>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">
                {footerDict.download_app}
              </h4>
              <div className="flex space-x-4">
                <a href="#">
                  <Image
                    src="/playstore.webp"
                    alt="Google Play"
                    width={135}
                    height={40}
                  />
                </a>
                <a href="#">
                  <Image
                    src="/appstore.webp"
                    alt="App Store"
                    width={120}
                    height={40}
                  />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">{footerDict.follow_us}</h4>
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
            <div>
              <h4 className="font-bold text-sm mb-4">
                {footerDict.newsletter}
              </h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder={footerDict.email_address}
                  className="bg-gray-800 border border-gray-700 text-white text-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 text-black font-bold text-sm px-6 py-2 hover:bg-yellow-500 transition-colors"
                >
                  {footerDict.subscribe}
                </button>
              </form>
            </div>
          </div>

          {/* Kolom 2 & 3 Gabungan: Semua Links */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold text-sm mb-6">
                  {footerDict.news_event}
                </h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.news}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.events}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.press_release}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6">
                  {footerDict.equipment}
                </h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.new_machines}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.rental}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.used_equipment}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.engines}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.lift_trucks}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.work_tools}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.metso}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6">{footerDict.parts}</h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.cat_parts}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.parts_return}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.pcc_loyalty}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6">
                  {footerDict.service_support}
                </h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.cat_rebuild}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.cat_sos}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.customer_value_agreement}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.equipment_protection}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.equipment_maintenance}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.fuel_guarantee}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {footerDict.repair_options}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-2 bg-yellow-400"></div>
    </footer>
  );
};

export default Footer;
