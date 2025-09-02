import { Eye, Target } from 'lucide-react'; // Impor ikon

const VisionMission = ({ dictionary }) => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bagian Visi dengan Ikon */}
          <div className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
            <div className="flex-shrink-0 bg-yellow-400 p-4 rounded-full">
              <Eye size={32} className="text-black" />
            </div>
            <div>
              <h2 className="text-black font-bold uppercase tracking-wider text-sm mb-2">
                {dictionary.vision_title}
              </h2>
              <p className="text-2xl font-semibold text-gray-800">
                {dictionary.vision_text}
              </p>
            </div>
          </div>

          {/* Bagian Misi dengan Ikon */}
          <div className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
            <div className="flex-shrink-0 bg-yellow-400 p-4 rounded-full">
              <Target size={32} className="text-black" />
            </div>
            <div>
              <h2 className="text-black font-bold uppercase tracking-wider text-sm mb-2">
                {dictionary.mission_title}
              </h2>
              <p className="text-2xl font-semibold text-gray-800">
                {dictionary.mission_text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
