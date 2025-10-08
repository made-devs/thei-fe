export const specMap = {
  forklift: [
    { label: "Rated Capacity", path: "performance.rated_capacity" },
    { label: "Lifting Height", path: "performance.lifting_height" },
    { label: "Travel Speed (Laden)", path: "speed.travel_laden" },
    { label: "Gradeability (Laden)", path: "gradeability.laden" },
    { label: "Battery", path: "power.battery" },
    { label: "Weight", path: "size.weight" },
    { label: "Turning Radius", path: "dimensions.min_turning_radius" },
    { label: "Overall Dimension", path: "size.overall_dimension" },
    { label: "Tilting Angle", path: "performance.tilting_angle" },
    { label: "Controller", path: "power.controller" },
  ],
  "mini-excavator": [
    {
      label: "Operating Weight",
      path: "basic_technical_data.operating_weight",
    },
    { label: "Rated Power", path: "basic_technical_data.rated_power" },
    {
      label: "Standard Capacity",
      path: "basic_technical_data.standard_capacity",
    },
    { label: "Max Digging Depth", path: "operating_range.max_digging_depth" },
    { label: "Max Dumping Height", path: "operating_range.max_dumping_height" },
    { label: "Max Digging Radius", path: "operating_range.max_digging_radius" },
  ],
  excavator: [
    {
      label: "Operating Weight",
      path: "basic_technical_data.operating_weight",
    },
    { label: "Rated Power", path: "basic_technical_data.rated_power" },
    {
      label: "Standard Capacity",
      path: "basic_technical_data.standard_capacity",
    },
    { label: "Max Digging Radius", path: "operating_range.max_digging_radius" },
    { label: "Max Digging Depth", path: "operating_range.max_digging_depth" },
    { label: "Max Dumping Height", path: "operating_range.max_dumping_height" },
  ],
  "wheel-loader": [
    {
      label: "Operating Weight",
      path: "basic_technical_data.operating_weight",
    },
    { label: "Rated Load", path: "basic_technical_data.rated_load" },
    {
      label: "Rated Bucket Capacity",
      path: "basic_technical_data.rated_bucket_capacity",
    },
    { label: "Rated Power", path: "basic_technical_data.rated_power" },
    { label: "Max Breakout Force", path: "operating_range.max_breakout_force" },
    { label: "Cycle Time", path: "operating_range.lift_dump_descend_time" },
    { label: "Max Travel Speed", path: "operating_range.max_travel_speed" },
    { label: "Min Turning Radius", path: "dimensions.min_turning_radius" },
    { label: "Overall Length", path: "dimensions.overall_length" },
    { label: "Bucket Width", path: "dimensions.bucket_width" },
  ],
  "aerial-working-platform": [
    { label: "Work Height", path: "size.work_height" },
    { label: "Platform Height", path: "size.platform_height" },
    { label: "Platform Capacity", path: "performance.platform_capacity" },
    { label: "Drive Speed", path: "performance.drive_speed" },
    { label: "Gradeability", path: "performance.gradeability" },
    { label: "Max Wind Speed", path: "performance.max_wind_speed" },
    { label: "Battery Capacity", path: "power.battery_capacity" },
    { label: "Engine", path: "power.engine" },
  ],
  "motor-grader": [
    { label: "Peak Torque", path: "power_system_specification.peak_torque_nm" },
    {
      label: "Operating Weight",
      path: "load_spec.standard_with_counterweight_kg",
    },
    { label: "Rated Power", path: "power_system_specification.rated_power_kw" },
    {
      label: "Blade Tip Range",
      path: "operating_device_specification.blade_tip_range_degrees",
    },
    {
      label: "Clearance Rear Axle to Ground",
      path: "dimensions.clearance_rear_axle_to_ground_mm",
    },
    { label: "Turning Radius", path: "dimensions.turning_radius_mm" },
    {
      label: "Max Travel Speed",
      path: "running_specification.max_travel_speed_kmh",
    },
    { label: "Model Of Tire", path: "running_specification.model_of_tire" },
    { label: "Tank Capacity", path: "tank_capacity.fuel_tank_l" },
    { label: "Overall Length", path: "dimensions.overall_length_mm" },
  ],

  "vibro-roller": [
    { label: "Operating Mass (kg)", path: "load_data.operating_mass_kg" },
    {
      label: "Centrifugal Force (kN)",
      path: "compaction_data.centrifugal_force_kn",
    },
    {
      label: "Vibration Frequency (Hz)",
      path: "compaction_data.vibration_frequency_hz",
    },
    {
      label: "Nominal Amplitude (mm)",
      path: "compaction_data.nominal_amplitude_mm",
    },
    {
      label: "Drum Width (mm)",
      path: "compaction_data.width_of_vibrating_drum_mm",
    },
    { label: "Engine Power (kW)", path: "engine_data.rated_power_kw" },
    {
      label: "Gradeability (%)",
      path: "maneuverability_data.theoretical_gradeability_percent",
    },
    {
      label: "Travel Speed (km/h)",
      path: "maneuverability_data.travel_speed_kmh",
    },
    { label: "Fuel Tank Capacity (L)", path: "capacities_data.fuel_tank_l" },
    {
      label: "Static Linear Load (N/cm)",
      path: "load_data.static_linear_load_of_vibrating_drum_n_cm",
    },
  ],
  bulldozer: [
    {
      label: "Operating Weight",
      path: "basic_technical_data.operating_weight",
    },
    { label: "Rated Power", path: "basic_technical_data.rated_power" },
    { label: "Blade Capacity", path: "basic_technical_data.blade_capacity" },
    { label: "Blade Type", path: "dimensions_and_blade.blade_type" },
    { label: "Blade Width", path: "dimensions_and_blade.width" },
    { label: "Blade Height", path: "dimensions_and_blade.height" },
  ],
  crane: [
    { label: "Type", path: "type" },
    {
      label: "Max Rated Lifting Capacity",
      path: "lifting_performance.max_rated_lifting_capacity",
    },
    {
      label: "Max Load Moment (Basic Boom)",
      path: "lifting_performance.max_load_moment_of_basic_boom",
    },
    {
      label: "Max Load Moment (Main Boom Fully Extended)",
      path: "lifting_performance.max_load_moment_of_main_boom_fully_extended",
    },
    {
      label: "Max Lifting Height (Basic Boom)",
      path: "lifting_performance.max_lifting_height_of_basic_boom",
    },
    {
      label: "Max Lifting Height (Main Boom)",
      path: "lifting_performance.max_lifting_height_of_main_boom",
    },
    {
      label: "Max Lifting Height (Jib)",
      path: "lifting_performance.max_lifting_height_of_jib",
    },
    {
      label: "Max Rated Lifting Capacity x Working Radius",
      path: "lifting_performance.max_rated_lifting_capacity_x_working_radius",
    },
    {
      label: "Max Load Moment (Main Boom)",
      path: "lifting_performance.max_load_moment_of_main_boom",
    },
    {
      label: "Max Lifting Height (Main Boom Fully Extended)",
      path: "lifting_performance.max_lifting_height_of_main_boom_fully_extended",
    },
  ],
  "crawler-crane": [
    {
      label: "Max Lifting Capacity",
      path: "technical_data.max_lifting_capacity",
    },
    { label: "Max Lifting Moment", path: "technical_data.max_lifting_moment" },
    { label: "Gradeability", path: "technical_data.gradeability" },
    { label: "Slewing Speed", path: "technical_data.slewing_speed" },
    { label: "Traveling Speed", path: "technical_data.traveling_speed" },
    {
      label: "Max Lifting Capacity of Fixed Jib",
      path: "technical_data.max_lifting_capacity_of_fixed_jib",
    },
    { label: "Main Boom Length", path: "technical_data.main_boom_length" },
    { label: "Fixed Jib Length", path: "technical_data.fixed_jib_length" },
    {
      label: "Max Length of Main Boom + Fixed Jib",
      path: "technical_data.max_length_of_main_boom_fixed_jib",
    },
  ],
  "dump-truck": [
    { label: "Rated Payload", path: "basic_technical_data.rated_payload" },
    { label: "Body Volume", path: "basic_technical_data.body_volume" },
    {
      label: "Gross Vehicle Weight",
      path: "basic_technical_data.gross_vehicle_weight",
    },
    { label: "Engine Power", path: "engine_data.engine_power" },
    { label: "Max Speed", path: "performance.max_speed" },
    { label: "Min Turning Radius", path: "performance.min_turning_radius" },
    { label: "Overall Dimension", path: "dimensions.overall_dimension" },
  ],
};
