import { getDictionary } from "@/lib/dictionary";
import ContactHero from "@/components/Contact/ContactHero";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactForm from "@/components/Contact/ContactForm";
import CustomerService from "@/components/Contact/CustomerService";
import MapLoader from "@/components/Branches/MapLoader";

export default async function ContactPage({ params }) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang, "contact");
  const pageDict = dictionary.contact_page || {};
  const branchesDict = await getDictionary(lang, "branches");

  return (
    <>
      <ContactHero dictionary={pageDict.hero} />
      <MapLoader dictionary={branchesDict.branches_page.interactive_map} />

      {/* Contact Form Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          <ContactForm dictionary={pageDict.contact_form} />
        </div>
      </div>
      <ContactInfo dictionary={pageDict.contact_info} />
      <CustomerService dictionary={pageDict.customer_service} />
    </>
  );
}
