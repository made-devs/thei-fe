"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { mainSpecConfig } from "@/data/hero-spec-config";
import { categorySpecSections } from "./ProductHero/specSectionsConfig";
import TabNavigation from "./ProductHero/TabNavigation";
import OverviewTab from "./ProductHero/OverviewTab";
import SpecsTab from "./ProductHero/SpecsTab";
import QuoteTab from "./ProductHero/QuoteTab";
import DownloadTab from "./ProductHero/DownloadTab";

// Helper untuk mendapatkan value dari nested object
const getValueByPath = (obj, path) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

const ProductHero = ({ product, lang }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Fallback jika data produk tidak ada
  if (!product) {
    return null;
  }

  // Menyiapkan data breadcrumbs secara dinamis
  const breadcrumbs = [
    { name: "Home", link: `/${lang}` },
    { name: "Products", link: `/${lang}/equipment/new-machines` },
    { name: product.model, link: "#" },
  ];

  // Logika dinamis untuk mendapatkan spesifikasi utama (untuk Overview)
  const categoryKey = product.category.toLowerCase().replace(/ /g, "-");
  const specsConfig = mainSpecConfig[categoryKey] || mainSpecConfig.default;

  const mainSpecs = specsConfig
    .map((spec) => {
      let value = getValueByPath(product, spec.path);
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        value = Object.values(value).filter(Boolean).join(" / ");
      }
      return { label: spec.label, value };
    })
    .filter((spec) => spec.value);

  // Konfigurasi spesifikasi untuk tab Specs
  const sectionsForCategory = categorySpecSections[categoryKey] || [];
  const specSections = sectionsForCategory.map((config) => ({
    title: config.title,
    data: product[config.dataKey],
  }));

  // Tabs configuration
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "specs", label: "Specs" },
    { id: "quote", label: "Request Quote" },
    { id: "download", label: "Download PDF" },
  ];

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab product={product} mainSpecs={mainSpecs} />;
      case "specs":
        return <SpecsTab specSections={specSections} />;
      case "quote":
        return <QuoteTab product={product} />;
      case "download":
        return <DownloadTab product={product} />;
      default:
        return null;
    }
  };

  return (
    <section className="bg-gradient-to-br from-yellow-300 to-yellow-500 pt-8 pb-20 lg:pt-12 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1280px]">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-800 mb-4">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.name} className="flex items-center">
              {index > 0 && <ChevronRight size={16} className="mx-1" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-black">{crumb.name}</span>
              ) : (
                <Link href={crumb.link} className="hover:underline">
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Tab Navigation di center atas */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-[40rem]">
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Kolom Kiri: Gambar Produk */}
          <div className="relative flex items-center justify-start h-[420px] lg:h-full w-full">
            <div className="relative w-full max-w-[520px] h-[320px] lg:h-[420px] flex items-center justify-start mr-auto transition-transform duration-300 hover:scale-105">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.model}
                fill
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 35px 55px rgba(0,0,0,0.65))",
                  objectPosition: "center",
                }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Kolom Kanan: Tab Content */}
          <div className="rounded-lg p-6 lg:p-8">
            <div className="min-h-[400px]">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
