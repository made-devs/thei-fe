import Image from 'next/image';
import { MapPin, Phone, Clock } from 'lucide-react';

const PartsLocation = ({ dictionary }) => {
  if (!dictionary) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            {dictionary.title}{' '}
            <span className="text-yellow-400">
              {dictionary.title_highlight}
            </span>
          </h2>
          <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto">
            {dictionary.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Map */}
          <div className="order-2 lg:order-1 flex flex-col h-full">
            <div className="w-full rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400 flex-1">
              <iframe
                src={dictionary.map_embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="THEI Spareparts Location"
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <a
                href={dictionary.map_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                <MapPin size={20} />
                {dictionary.map_button_text}
              </a>
            </div>
          </div>

          {/* Info Card */}
          <div className="order-1 lg:order-2 rounded-xl px-8 flex flex-col justify-center h-full">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 bg-yellow-400 p-6 rounded-lg border-2 border-black/20 shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
                <div className="flex-shrink-0 bg-black rounded-full p-3">
                  <MapPin size={24} className="text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-black font-bold text-lg mb-2">
                    {dictionary.address_label}
                  </h3>
                  <p className="text-black text-sm leading-relaxed">
                    {dictionary.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 bg-yellow-400 p-6 rounded-lg border-2 border-black/20 shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
                <div className="flex-shrink-0 bg-black rounded-full p-3">
                  <Phone size={24} className="text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-black font-bold text-lg mb-2">
                    {dictionary.phone_label}
                  </h3>
                  <a
                    href={`tel:${dictionary.phone}`}
                    className="text-black hover:text-gray-700 transition-colors text-sm font-medium"
                  >
                    {dictionary.phone_display}
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 bg-yellow-400 p-6 rounded-lg border-2 border-black/20 shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
                <div className="flex-shrink-0 bg-black rounded-full p-3">
                  <Clock size={24} className="text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-black font-bold text-lg mb-2">
                    {dictionary.hours_label}
                  </h3>
                  <div className="text-black text-sm space-y-1">
                    {dictionary.hours?.map((hour, idx) => (
                      <p
                        key={idx}
                        className={
                          hour.highlight ? 'text-red-600 font-semibold' : ''
                        }
                      >
                        {hour.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartsLocation;
