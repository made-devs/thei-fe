const EquipmentIntro = ({ dictionary }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px] text-center">
        <h2 className="text-4xl font-bold text-black max-w-4xl mx-auto">
          {dictionary.title}
        </h2>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {dictionary.description}
        </p>
      </div>
    </section>
  );
};

export default EquipmentIntro;
