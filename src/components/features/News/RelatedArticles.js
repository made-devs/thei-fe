// Filepath: app/components/News/RelatedArticles.js
import Image from 'next/image';
import Link from 'next/link';

const RelatedArticles = ({ articles, currentSlug, lang, dictionary }) => {
  // Filter out the current article and take the first 3
  const related = articles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
          {dictionary.title || 'Related Articles'}
        </h2>

        {/* Grid for Desktop/Tablet */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {related.map((article) => (
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
                  <h3 className="text-base sm:text-lg font-bold text-black mb-2 flex-grow">
                    {article.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {article.excerpt}
                  </p>
                  <span className="font-semibold text-yellow-500 group-hover:underline">
                    {dictionary.read_more || 'Read More'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* List View for Mobile */}
        <div className="block md:hidden space-y-4">
          {related.map((article) => (
            <Link key={article.id} href={`/${lang}/news/${article.slug}`}>
              <div className="flex bg-white rounded-lg shadow-md mb-2 p-4 hover:shadow-lg transition-shadow">
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
                  <h3 className="text-base font-bold text-black mb-1 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="font-semibold text-yellow-500 group-hover:underline">
                    {dictionary.read_more || 'Read More'}
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

export default RelatedArticles;
