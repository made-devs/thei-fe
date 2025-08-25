// /app/components/Footer.js
import React from 'react';
import Image from 'next/image';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = ({ dictionary }) => {
  return (
    // FIX: Ganti bg-black dengan warna custom --color-black
    <footer className="bg-[var(--color-black)] text-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] py-20">
        {/* FIX: Ubah grid utama menjadi 3 kolom di desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Kolom 1: Kontak & Info */}
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-sm mb-4">
                {dictionary.head_office}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Jl. Raya Cilandak KKO No.1, RT.13/RW.5, Ragunan, Ps. Minggu,
                Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12560
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">{dictionary.phone}</h4>
              <p className="text-gray-400 text-sm">
                (62-21) 782 2373
                <br />
                (62-21) 2997 6620 (Hunting)
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">{dictionary.email}</h4>
              <a
                href="mailto:info@trakindo.co.id"
                className="text-gray-400 text-sm hover:text-yellow-400"
              >
                info@trakindo.co.id
              </a>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">
                {dictionary.download_app}
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
              <h4 className="font-bold text-sm mb-4">{dictionary.follow_us}</h4>
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
                {dictionary.newsletter}
              </h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder={dictionary.email_address}
                  className="bg-gray-800 border border-gray-700 text-white text-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 text-black font-bold text-sm px-6 py-2 hover:bg-yellow-500 transition-colors"
                >
                  {dictionary.subscribe}
                </button>
              </form>
            </div>
          </div>

          {/* Kolom 2 & 3 Gabungan: Semua Links */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold text-sm mb-6">
                  {dictionary.news_event}
                </h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.news}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.events}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.press_release}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6">
                  {dictionary.equipment}
                </h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.new_machines}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.rental}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.used_equipment}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.engines}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.lift_trucks}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.work_tools}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.metso}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6">{dictionary.parts}</h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.cat_parts}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.parts_return}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.pcc_loyalty}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-6">
                  {dictionary.service_support}
                </h4>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.cat_rebuild}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.cat_sos}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.customer_value_agreement}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.equipment_protection}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.equipment_maintenance}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.fuel_guarantee}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {dictionary.repair_options}
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
