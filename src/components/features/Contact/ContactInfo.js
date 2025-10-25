// Filepath: app/components/Contact/ContactInfo.js
import { Building2, Phone, MessageSquare, Mail } from 'lucide-react';

const iconMap = {
  Building2: <Building2 size={24} className="text-yellow-500 sm:w-8 sm:h-8" />,
  Phone: <Phone size={24} className="text-yellow-500 sm:w-8 sm:h-8" />,
  MessageSquare: (
    <MessageSquare size={24} className="text-yellow-500 sm:w-8 sm:h-8" />
  ),
  Mail: <Mail size={24} className="text-yellow-500 sm:w-8 sm:h-8" />,
};

const ContactInfo = ({ dictionary }) => {
  if (!dictionary || !dictionary.cards) return null;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
            {dictionary.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {dictionary.cards.map((card) => (
            <div
              key={card.title}
              className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg text-center flex flex-col items-center"
            >
              <div className="bg-white p-3 sm:p-4 rounded-full shadow-md mb-4 sm:mb-6">
                {iconMap[card.icon]}
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-black">
                {card.title}
              </h3>
              <p className="text-gray-600 mt-2 text-xs sm:text-sm flex-grow">
                {card.line1}
                <br />
                {card.line2}
              </p>
              <a
                href={card.link || '#'}
                target={card.icon === 'Building2' ? '_blank' : '_self'} // Buka tab baru untuk Google Maps
                rel={
                  card.icon === 'Building2' ? 'noopener noreferrer' : undefined
                }
                className="mt-4 sm:mt-6 text-yellow-600 font-semibold text-xs sm:text-sm hover:underline"
              >
                {card.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
