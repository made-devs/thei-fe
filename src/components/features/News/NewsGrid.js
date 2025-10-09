'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tag, Building, Heart, Wrench } from 'lucide-react';

const categoryIcons = {
  Promo: <Tag size={16} />,
  Project: <Building size={16} />,
  CSR: <Heart size={16} />,
  Training: <Wrench size={16} />,
};

const NewsGrid = ({ dictionary, lang }) => {
  const [filter, setFilter] = useState('All');
  const mainDict = dictionary.main_section || {};
  const articles = dictionary.articles || [];

  const filteredArticles =
    filter === 'All'
      ? articles
      : articles.filter((article) => article.category === filter);

  const categories = ['All', 'Promo', 'Project', 'CSR', 'Training'];

  const categoryTranslations = {
    All: mainDict.all,
    Promo: mainDict.promo,
    Project: mainDict.project,
    CSR: mainDict.csr,
    Training: mainDict.training,
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        {/* Section Header */}
        {mainDict.title && (
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              {mainDict.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              {mainDict.description}
            </p>
          </div>
        )}

        {/* Filter Buttons - Scrollable Horizontal */}
        <div className="flex overflow-x-auto gap-4 mb-8 sm:mb-12 scrollbar-hide px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap flex-shrink-0 ${
                filter === category
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryTranslations[category]}
            </button>
          ))}
        </div>

        {/* News Grid for Desktop/Tablet */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/${lang}/news/${article.slug}`}>
              <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="relative aspect-video">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span className="mr-2 text-yellow-500">
                      {categoryIcons[article.category]}
                    </span>
                    <span>{categoryTranslations[article.category]}</span>
                    <span className="mx-2">|</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-black mb-2 flex-grow">
                    {article.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {article.excerpt}
                  </p>
                  <span className="font-semibold text-yellow-500 group-hover:underline">
                    {mainDict.read_more}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* List View for Mobile */}
        <div className="block md:hidden space-y-4">
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/${lang}/news/${article.slug}`}>
              <div className="flex bg-white rounded-lg shadow-md p-4 mb-2 hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden mr-4 flex-shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <span className="mr-2 text-yellow-500">
                      {categoryIcons[article.category]}
                    </span>
                    <span>{categoryTranslations[article.category]}</span>
                    <span className="mx-2">|</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-black mb-1 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;
