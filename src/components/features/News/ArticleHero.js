// Filepath: app/components/News/ArticleHero.js
import Image from 'next/image';
import { Calendar, Tag } from 'lucide-react';

const ArticleHero = ({ article }) => {
  if (!article) return null;

  return (
    <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center text-white text-center">
      <Image
        src={article.image}
        alt={article.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Konten ditengah */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col items-center max-w-4xl">
        {/* Meta info (Kategori & Tanggal) */}
        <div className="flex items-center space-x-4 text-xs sm:text-sm text-yellow-300 mb-4">
          <div className="flex items-center space-x-2">
            <Tag size={16} />
            <span>{article.category}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{article.date}</span>
          </div>
        </div>

        {/* Judul Artikel */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {article.title}
        </h1>
      </div>
    </section>
  );
};

export default ArticleHero;
