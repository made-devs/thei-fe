"use client";
import { PlayCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback, useMemo } from "react";

const PartnerTestimonial = ({ dictionary }) => {
  // Pindahkan semua hooks ke awal, SEBELUM conditional return
  const videoTestimonials = useMemo(
    () => dictionary?.video_testimonials?.videos || [],
    [dictionary?.video_testimonials]
  );

  const [videoEmblaRef, videoEmblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: true,
  });

  const [videoActiveIdx, setVideoActiveIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (!videoEmblaApi) return;
    const onSelect = () =>
      setVideoActiveIdx(videoEmblaApi.selectedScrollSnap());
    videoEmblaApi.on("select", onSelect);
    onSelect();
    return () => {
      videoEmblaApi.off("select", onSelect);
    };
  }, [videoEmblaApi]);

  const videoScrollPrev = useCallback(
    () => videoEmblaApi && videoEmblaApi.scrollPrev(),
    [videoEmblaApi]
  );

  const videoScrollNext = useCallback(
    () => videoEmblaApi && videoEmblaApi.scrollNext(),
    [videoEmblaApi]
  );

  // Conditional check SETELAH semua hooks
  if (!dictionary || videoTestimonials.length === 0) {
    return null;
  }

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">
            {dictionary.video_testimonials?.title ||
              "Kisah Sukses Partner Kami"}
          </h2>
        </div>

        {/* Video Carousel */}
        <div className="relative">
          <div className="overflow-hidden px-4 sm:px-0" ref={videoEmblaRef}>
            <div className="flex -ml-4">
              {videoTestimonials.map((video, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                >
                  <div
                    className="group cursor-pointer"
                    onClick={() => openModal(video)}
                  >
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg max-h-96 md:max-h-[32rem]">
                      <Image
                        src={
                          video.thumbnail ||
                          `https://placehold.co/1600x900/1a1a1a/ffc700?text=Video+${
                            index + 1
                          }`
                        }
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <PlayCircle
                          size={64}
                          className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                        />
                      </div>
                    </div>
                    <div className="p-4 text-left">
                      <h4 className="font-bold text-lg mt-2">{video.title}</h4>
                      <p className="text-sm text-gray-600">
                        {video.name}, {video.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2 md:hidden">
            {videoTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => videoEmblaApi && videoEmblaApi.scrollTo(idx)}
                className={`h-2 rounded-full transition-all ${
                  videoActiveIdx === idx
                    ? "w-6 bg-yellow-400"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            className="absolute top-[calc(50%-2.75rem)] -left-4 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md hidden lg:flex"
            onClick={videoScrollPrev}
          >
            <ArrowLeft size={24} className="text-black" />
          </button>
          <button
            className="absolute top-[calc(50%-2.75rem)] -right-4 bg-white/80 hover:bg-yellow-400 rounded-full p-2 shadow-md hidden lg:flex"
            onClick={videoScrollNext}
          >
            <ArrowRight size={24} className="text-black" />
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && selectedVideo && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white text-2xl z-10 bg-black/50 hover:bg-black/80 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={closeModal}
              >
                &times;
              </button>
              <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-black">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: "none" }}
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnerTestimonial;
