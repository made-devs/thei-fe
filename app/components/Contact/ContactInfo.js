// Filepath: app/components/Contact/ContactInfo.js
import { Building2, Phone, MessageSquare, Mail } from 'lucide-react';

const iconMap = {
  Building2: <Building2 size={32} className="text-yellow-500" />,
  Phone: <Phone size={32} className="text-yellow-500" />,
  MessageSquare: <MessageSquare size={32} className="text-yellow-500" />,
  Mail: <Mail size={32} className="text-yellow-500" />,
};

const ContactInfo = ({ dictionary }) => {
  if (!dictionary || !dictionary.cards) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">{dictionary.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dictionary.cards.map((card) => (
            <div
              key={card.title}
              className="bg-gray-50 p-8 rounded-lg text-center flex flex-col items-center"
            >
              <div className="bg-white p-4 rounded-full shadow-md mb-6">
                {iconMap[card.icon]}
              </div>
              <h3 className="text-xl font-bold text-black">{card.title}</h3>
              <p className="text-gray-600 mt-2 text-sm flex-grow">
                {card.line1}
                <br />
                {card.line2}
              </p>
              <a
                href="#"
                className="mt-6 text-yellow-600 font-semibold text-sm hover:underline"
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
