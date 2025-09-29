// /app/[lang]/equipment/page.js

import { getDictionary } from "@/lib/dictionary";
import EquipmentHero from "@/components/Equipment/EquipmentHero";
import EquipmentIntro from "@/components/Equipment/EquipmentIntro";
import EquipmentCategoryList from "@/components/Equipment/EquipmentCategoryList";
import MainCta from "@/components/Home/MainCta";

export default async function EquipmentPage({ params }) {
  // Terima 'params' sebagai objek
  const { lang } = await params; // Await params dan destructure 'lang' setelahnya

  const dictionary = await getDictionary(lang, "equipment");
  // Fallback untuk mencegah error jika dictionary tidak ada
  const equipmentDict = dictionary.equipment_page || {};
  const commonDict = dictionary || {};

  return (
    <>
      <EquipmentHero dictionary={equipmentDict.hero} />
      <EquipmentIntro dictionary={equipmentDict.intro} />
      <EquipmentCategoryList
        dictionary={equipmentDict.categories}
        lang={lang}
      />
      <MainCta dictionary={commonDict.main_cta} />
    </>
  );
}
