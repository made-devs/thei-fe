const VisionMission = ({ dictionary }) => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-yellow-500 font-bold uppercase tracking-wider">
              {dictionary.vision_title}
            </h2>
            <p className="mt-2 text-2xl font-semibold text-black">
              {dictionary.vision_text}
            </p>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-yellow-500 font-bold uppercase tracking-wider">
              {dictionary.mission_title}
            </h2>
            <p className="mt-2 text-2xl font-semibold text-black">
              {dictionary.mission_text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
