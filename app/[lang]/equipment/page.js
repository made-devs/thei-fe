// /app/[lang]/equipment/page.js

// FIX: Path impor diubah menggunakan alias agar lebih robust
import { getDictionary } from '@/lib/dictionary';
import HeroEquipment from '@/components/Equipment/HeroEquipment';
import CategoryList from '@/components/Equipment/CategoryList';

export default async function EquipmentPage({ params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const equipmentDict = dictionary.equipment_page;

  return (
    <>
      <HeroEquipment dictionary={equipmentDict} />
      <CategoryList dictionary={equipmentDict} />
    </>
  );
}
