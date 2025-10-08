// Filepath: app/components/Contact/CustomerService.js
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PlayCircle, X } from 'lucide-react';

const CustomerService = ({ dictionary }) => {
  const [showVideo, setShowVideo] = useState(false);

  // Tambahkan pengecekan yang lebih kuat untuk objek video.
  const videoData = dictionary?.video;

  if (!dictionary) return null;

  return (
    <>
      <section className="bg-yellow-300 py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-black mb-4">
                {dictionary.title}
              </h2>
              <p className="text-gray-800">{dictionary.description}</p>
            </div>
            {/* Lakukan render kondisional berdasarkan keberadaan videoData */}
            {videoData ? (
              <div
                className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer shadow-lg"
                onClick={() => setShowVideo(true)}
              >
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                  <PlayCircle
                    size={80}
                    className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                  />
                </div>
                <Image
                  src={videoData.thumbnail}
                  alt={videoData.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              // Tampilkan placeholder jika data video tidak ada
              <div className="relative aspect-video rounded-lg bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Video coming soon</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {showVideo && videoData && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-yellow-400"
            >
              <X size={32} />
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoData.id}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerService;
