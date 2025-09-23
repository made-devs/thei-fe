import { getDictionary } from '@/lib/dictionary';
import EquipmentHero from '@/components/Equipment/EquipmentHero';
import EquipmentIntro from '@/components/Equipment/EquipmentIntro';
import MainCta from '@/components/Home/MainCta';
import InteractiveEquipmentView from '@/components/Equipment/InteractiveEquipmentView';
// Impor data
import forkliftData from '../../../data/forklift.json';
import miniExcavatorData from '../../../data/mini-excavator.json';
import excavatorData from '../../../data/excavator.json';

export default async function NewMachinesPage({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang, 'new-machines');
  const newMachinesDict = dictionary.new_machines_page || {};

  const homeDictionary = await getDictionary(lang, 'homepage');

  const equipmentCategories = newMachinesDict.types || [];

  // Menambahkan properti 'subtype' saat menggabungkan data
  const allExcavators = [
    ...(excavatorData.medium_excavators || []).map((exc) => ({
      ...exc,
      subtype: 'Medium',
    })),
    ...(excavatorData.large_excavators || []).map((exc) => ({
      ...exc,
      subtype: 'Large',
    })),
  ];

  // Kumpulkan semua data produk dalam satu objek
  const productData = {
    Forklift: forkliftData.forklifts || [],
    'Forklift (Diesel, Listrik, AGV)': forkliftData.forklifts || [],
    'Mini Excavator': miniExcavatorData.mini_excavators || [],
    Excavator: allExcavators,
  };

  return (
    <>
      {newMachinesDict.hero && (
        <EquipmentHero dictionary={newMachinesDict.hero} />
      )}
      {newMachinesDict.intro && (
        <EquipmentIntro dictionary={newMachinesDict.intro} />
      )}

      {/* Kirim semua data produk ke komponen */}
      <InteractiveEquipmentView
        categories={equipmentCategories}
        productData={productData}
      />

      {homeDictionary.main_cta && (
        <MainCta dictionary={homeDictionary.main_cta} />
      )}
    </>
  );
}
