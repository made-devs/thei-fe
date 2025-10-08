'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const EquipmentCategoryList = ({ dictionary, lang }) => {
  // --- Pindahkan semua hooks ke atas ---
  const [flippedIdx, setFlippedIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFlip = (idx, e) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setFlippedIdx(flippedIdx === idx ? null : idx);
    }
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // --- Baru lakukan pengecekan dan return ---
  if (!Array.isArray(dictionary) || dictionary.length === 0) {
    return null;
  }

  // Mobile carousel view
  if (isMobile) {
    return (
      <section className="bg-gray-50 pt-10 lg:py-20">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="relative">
            {/* Embla Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {dictionary.map((category, idx) => (
                  <div
                    key={category.title}
                    className="flex-[0_0_100%] min-w-0 py-10 px-4"
                  >
                    <div className="flex justify-center">
                      <StyledWrapper
                        $flipped={flippedIdx === idx}
                        onClick={(e) => handleFlip(idx, e)}
                        tabIndex={0}
                      >
                        <div className="flip-card">
                          <div
                            className={`flip-card-inner${
                              flippedIdx === idx ? ' flipped' : ''
                            }`}
                          >
                            {/* Sisi Depan */}
                            <div className="flip-card-front">
                              <div className="relative w-full h-full">
                                <Image
                                  src={category.image}
                                  alt={category.title}
                                  fill
                                  className="object-cover rounded-lg"
                                  sizes="100vw"
                                  priority={idx < 3}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end p-4">
                                  <p className="title text-white">
                                    {category.title}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Sisi Belakang */}
                            <div className="flip-card-back custom-back">
                              <div className="back-content">
                                <p className="title back-title">
                                  {category.title}
                                </p>
                                <p className="desc">
                                  {category.description ||
                                    'Explore our equipment range.'}
                                </p>
                                <div className="btn-wrap">
                                  <Link
                                    href={
                                      `/${lang}${category.cta1_link}` || '#'
                                    }
                                    className="cta-btn"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>
                                      {category.cta1_text || 'View More'}
                                    </span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </StyledWrapper>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Navigation Arrows */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-yellow-400 active:bg-yellow-400 rounded-full p-2 shadow-lg transition"
              onClick={scrollPrev}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-gray-800" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-yellow-400 active:bg-yellow-400 rounded-full p-2 shadow-lg transition"
              onClick={scrollNext}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-gray-800" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Desktop grid view (sama seperti sebelumnya)
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 justify-items-center">
          {dictionary.map((category, idx) => (
            <StyledWrapper key={category.title}>
              <div className="flip-card">
                <div className="flip-card-inner">
                  {/* Sisi Depan */}
                  <div className="flip-card-front">
                    <div className="relative w-full h-full">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end p-4">
                        <p className="title text-white">{category.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sisi Belakang */}
                  <div className="flip-card-back custom-back">
                    <div className="back-content">
                      <p className="title back-title">{category.title}</p>
                      <p className="desc">
                        {category.description || 'Explore our equipment range.'}
                      </p>
                      <div className="btn-wrap">
                        <Link
                          href={`/${lang}${category.cta1_link}` || '#'}
                          className="cta-btn"
                        >
                          <span>{category.cta1_text || 'View More'}</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StyledWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentCategoryList;

// Styled-components
const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 260px;
    height: 400px;
    perspective: 1000px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer;
    /* Ukuran lebih besar di mobile */
    @media (max-width: 768px) {
      width: 340px;
      height: 480px;
    }
  }

  .title {
    font-size: 1.5em;
    font-weight: 900;
    text-align: center;
    margin: 0;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  /* Flip on hover (desktop only) */
  @media (hover: hover) and (pointer: fine) {
    &:hover .flip-card-inner {
      transform: rotateY(180deg);
    }
  }

  /* Flip on click (mobile) */
  .flip-card-inner.flipped {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid coral;
    border-radius: 1rem;
  }

  .flip-card-front {
    background: linear-gradient(
      120deg,
      bisque 60%,
      rgb(255, 231, 222) 88%,
      rgb(255, 211, 195) 40%,
      rgba(255, 127, 80, 0.603) 48%
    );
    color: coral;
  }

  .flip-card-back.custom-back {
    background: url('/bg-card-category.webp');
    background-size: cover;
    background-position: center;
    color: #fff;
    transform: rotateY(180deg);
    padding: 0;
  }

  .back-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    padding: 2.2rem 1.5rem 1.5rem 1.5rem;
  }

  .back-title {
    font-size: 1.6em;
    font-weight: 900;
    color: #ffd600;
    text-align: left;
    margin-bottom: 0.7em;
    letter-spacing: 0.5px;
  }

  .desc {
    text-align: left;
    font-size: 1em;
    color: #fff;
    margin-bottom: 2.2em;
    line-height: 1.5;
    min-height: 70px;
    max-width: 95%;
    word-break: break-word;
  }

  .btn-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .cta-btn {
    width: 160px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85em 0;
    background: #ffd600;
    color: #222;
    font-weight: 700;
    font-size: 1.05em;
    border-radius: 0.7em;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    transition: background 0.2s, color 0.2s;
    text-align: center;
    text-decoration: none;
    border: none;
    outline: none;
  }
  .cta-btn:hover {
    background: #222;
    color: #ffd600;
  }
`;
