import { getDictionary } from '@/lib/dictionary';
import EquipmentHero from '@/components/Equipment/EquipmentHero';
import EquipmentIntro from '@/components/Equipment/EquipmentIntro';
import ProductGrid from '@/components/Equipment/ProductGrid';
import MainCta from '@/components/Home/MainCta';

export default async function NewMachinesPage({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang, 'new-machines');
  const newMachinesDict = dictionary.new_machines_page || {};

  const homeDictionary = await getDictionary(lang, 'homepage');

  return (
    <>
      {newMachinesDict.hero && (
        <EquipmentHero dictionary={newMachinesDict.hero} />
      )}
      {newMachinesDict.intro && (
        <EquipmentIntro dictionary={newMachinesDict.intro} />
      )}
      {/* Menggunakan 'types' sesuai dengan struktur dictionary yang benar */}
      {newMachinesDict.types && (
        <ProductGrid dictionary={newMachinesDict.types} />
      )}
      {homeDictionary.main_cta && (
        <MainCta dictionary={homeDictionary.main_cta} />
      )}
    </>
  );
}
