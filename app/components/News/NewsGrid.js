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

const NewsGrid = ({ dictionary }) => {
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
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${
                filter === category
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryTranslations[category]}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/news/${article.slug}`}>
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
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span className="mr-2 text-yellow-500">
                      {categoryIcons[article.category]}
                    </span>
                    <span>{categoryTranslations[article.category]}</span>
                    <span className="mx-2">|</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2 flex-grow">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
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
      </div>
    </section>
  );
};

export default NewsGrid;
