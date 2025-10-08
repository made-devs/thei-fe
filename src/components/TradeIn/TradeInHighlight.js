'use client';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';

const TradeInHighlight = ({ dictionary }) => {
  // Jangan render jika data tidak lengkap
  if (!dictionary || !dictionary.image_before || !dictionary.image_after) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-black">
            {dictionary.title}
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={dictionary.image_before}
                alt="Old Excavator"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={dictionary.image_after}
                alt="New Excavator"
              />
            }
            className="w-full aspect-video"
          />
        </div>
      </div>
    </section>
  );
};

export default TradeInHighlight;
