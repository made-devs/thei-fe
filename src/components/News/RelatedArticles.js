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
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          {dictionary.title || 'Related Articles'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {related.map((article) => (
            <Link key={article.id} href={`/${lang}/news/${article.slug}`}>
              <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="relative aspect-video">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-black mb-2 flex-grow">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
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
