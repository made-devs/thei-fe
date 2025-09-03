// Filepath: app/[lang]/contact/page.js
import { getDictionary } from '@/lib/dictionary';
import ContactHero from '@/components/Contact/ContactHero';
import ContactInfo from '@/components/Contact/ContactInfo';
import ContactForm from '@/components/Contact/ContactForm';
import CustomerService from '@/components/Contact/CustomerService';
import MapLoader from '@/components/Branches/MapLoader';

export default async function ContactPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang, 'contact');
  const pageDict = dictionary.contact_page || {};
  const branchesDict = await getDictionary(lang, 'branches');

  return (
    <>
      <ContactHero dictionary={pageDict.hero} />
      <ContactInfo dictionary={pageDict.contact_info} />
      {/* Penyesuaian padding dan struktur grid */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          {/* Menghapus items-start agar kolom sama tinggi */}
          <div className="grid lg:grid-cols-2 gap-16">
            <ContactForm dictionary={pageDict.contact_form} />
            {/* Bungkus MapLoader dengan div yang memiliki tinggi eksplisit */}
            <div className="h-full min-h-[600px] lg:min-h-0">
              <MapLoader
                dictionary={branchesDict.branches_page.interactive_map}
              />
            </div>
          </div>
        </div>
      </div>
      <CustomerService dictionary={pageDict.customer_service} />
    </>
  );
}
