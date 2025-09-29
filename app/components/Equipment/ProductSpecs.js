import React from "react";

// Helper untuk memformat nilai yang mungkin objek
const formatSpecValue = (value) => {
  if (typeof value === "object" && value !== null) {
    if (value.restricted && value.unrestricted) {
      return `${value.unrestricted} / ${value.restricted}`;
    }
    if (value.indoor || value.outdoor) {
      return `${value.indoor || "-"} / ${value.outdoor || "-"}`;
    }
    return JSON.stringify(value);
  }
  return value;
};

const SpecItem = ({ label, value }) => {
  const formattedValue = formatSpecValue(value);
  if (!formattedValue) return null;

  return (
    <div className="flex justify-between">
      <span className="font-semibold text-gray-600">{label}:</span>
      <span className="font-bold text-black">{formattedValue}</span>
    </div>
  );
};

const ProductSpecs = ({ product, categoryName }) => {
  const isForklift = !!product.performance?.rated_capacity;
  const isBulldozer = !!product.basic_technical_data?.blade_capacity;
  const isCrane = !!product.lifting_performance;
  const isSkidSteer = !!product.dimensions_and_performance;
  const isBoomLift = !!product.size?.work_height;
  const isTelehandler = !!product.size_and_performance;
  const isCrawlerCrane =
    !!product.technical_data && categoryName.includes("Crawler Crane");
  const isTruckMountedPump = product.type === "Truck Mounted Pump";
  const isTruckMixer = product.type === "Truck Mixer";
  const isTrailerPump = product.type === "Trailer Pump";
  const isCityPump = product.type === "City Pump";
  const isAWP =
    product.type?.includes("Lift") ||
    product.type === "Aerial Working Platform";

  if (isForklift) {
    return (
      <>
        <SpecItem
          label="Rated Capacity"
          value={product.performance.rated_capacity}
        />
        <SpecItem
          label="Lifting Height"
          value={product.performance.lifting_height}
        />
        <SpecItem
          label="Engine Type"
          value={product.power.controller || "Internal Combustion"}
        />
      </>
    );
  }
  if (isBulldozer) {
    return (
      <>
        <SpecItem
          label="Operating Weight"
          value={product.basic_technical_data.operating_weight}
        />
        <SpecItem
          label="Rated Power"
          value={product.basic_technical_data.rated_power}
        />
        <SpecItem
          label="Blade Capacity"
          value={product.basic_technical_data.blade_capacity}
        />
      </>
    );
  }
  if (isCrane) {
    return (
      <>
        <SpecItem
          label="Max Lifting Capacity"
          value={product.lifting_performance.max_rated_lifting_capacity}
        />
        <SpecItem
          label="Max Lifting Height"
          value={product.lifting_performance.max_lifting_height_of_main_boom}
        />
        <SpecItem
          label="Max Jib Height"
          value={product.lifting_performance.max_lifting_height_of_jib}
        />
      </>
    );
  }
  if (isSkidSteer) {
    return (
      <>
        <SpecItem
          label="Operating Weight"
          value={product.basic_technical_data.operating_weight}
        />
        <SpecItem
          label="Rated Power"
          value={product.basic_technical_data.rated_power}
        />
        <SpecItem
          label="Bucket Capacity"
          value={product.basic_technical_data.bucket_capacity}
        />
      </>
    );
  }
  if (isBoomLift) {
    return (
      <>
        <SpecItem label="Work Height" value={product.size.work_height} />
        <SpecItem
          label="Platform Capacity"
          value={product.performance.platform_capacity}
        />
        <SpecItem
          label="Horizontal Outreach"
          value={product.size.horizontal_outreach}
        />
      </>
    );
  }
  if (isTelehandler) {
    return (
      <>
        <SpecItem
          label="Rated Capacity"
          value={product.size_and_performance.rated_capacity}
        />
        <SpecItem
          label="Max Lift Height"
          value={product.size_and_performance.max_lift_height}
        />
        <SpecItem
          label="Max Forward Reach"
          value={product.size_and_performance.max_forward_reach}
        />
      </>
    );
  }
  if (isCrawlerCrane) {
    return (
      <>
        <SpecItem
          label="Max Lifting Capacity"
          value={product.technical_data.max_lifting_capacity}
        />
        <SpecItem
          label="Max Lifting Moment"
          value={product.technical_data.max_lifting_moment}
        />
        <SpecItem
          label="Main Boom Length"
          value={product.technical_data.main_boom_length}
        />
      </>
    );
  }
  if (isTruckMountedPump) {
    return (
      <>
        <SpecItem
          label="Reach Height"
          value={product.boom_data?.reach_height}
        />
        <SpecItem label="Max Output" value={product.pump_data?.max_output} />
        <SpecItem
          label="Max Pressure"
          value={product.pump_data?.max_pressure}
        />
      </>
    );
  }
  if (isTruckMixer) {
    return (
      <>
        <SpecItem
          label="Agitator Capacity"
          value={product.mixing_drum_parameters?.agitator_capacity}
        />
        <SpecItem label="Engine" value={product.chassis_parameters?.engine} />
        <SpecItem
          label="Rated Power"
          value={product.chassis_parameters?.rated_power}
        />
      </>
    );
  }
  if (isTrailerPump) {
    return (
      <>
        <SpecItem
          label="Max Output"
          value={product.pump_details?.max_theo_concrete_output}
        />
        <SpecItem
          label="Max Pressure"
          value={product.pump_details?.max_concrete_pumping_pressure}
        />
        <SpecItem
          label="Engine Model"
          value={product.power_system?.engine_model || "N/A"}
        />
      </>
    );
  }
  if (isCityPump) {
    return (
      <>
        <SpecItem
          label="Max Output"
          value={product.pumping_unit?.maximum_theorical_output}
        />
        <SpecItem
          label="Max Pressure"
          value={product.pumping_unit?.maximum_theorical_pressure}
        />
        <SpecItem
          label="Rated Power"
          value={product.power_system?.rated_power}
        />
      </>
    );
  }
  if (isAWP) {
    return (
      <>
        <SpecItem
          label="Work Height"
          value={
            product.size?.work_height ||
            product.size_and_dimensions?.work_height
          }
        />
        <SpecItem
          label="Platform Capacity"
          value={product.performance?.platform_capacity}
        />
        <SpecItem
          label="Gross Weight"
          value={
            product.weight_and_pressure?.gross_weight ||
            product.weight?.gross_weight
          }
        />
      </>
    );
  }

  // Fallback untuk tipe produk lain
  return (
    <>
      <SpecItem
        label="Operating Weight"
        value={product.basic_technical_data?.operating_weight}
      />
      <SpecItem
        label="Rated Power"
        value={product.basic_technical_data?.rated_power}
      />
      <SpecItem
        label="Digging Depth"
        value={product.operating_range?.max_digging_depth}
      />
    </>
  );
};

export default ProductSpecs;
