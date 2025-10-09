// Filepath: app/components/News/ArticleContent.js
import Image from 'next/image';

const ArticleContent = ({ content }) => {
  if (!content || !Array.isArray(content)) return null;

  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p
            key={index}
            className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-6"
          >
            {block.text}
          </p>
        );
      case 'subheading':
        return (
          <h2
            key={index}
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mt-8 sm:mt-10 mb-4"
          >
            {block.text}
          </h2>
        );
      case 'image':
        return (
          <div
            key={index}
            className="relative aspect-video my-6 sm:my-8 rounded-lg overflow-hidden"
          >
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-4xl mx-auto">
          {content.map(renderContentBlock)}
        </article>
      </div>
    </div>
  );
};

export default ArticleContent;
