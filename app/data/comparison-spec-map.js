export const specMap = [
  // 1. Identitas Model
  { label: 'Model Type', path: 'type' },

  // 2. Kapasitas & Kinerja Utama Forklift
  { label: 'Rated Capacity', path: 'performance.rated_capacity' },
  { label: 'Lifting Height', path: 'performance.lifting_height' },
  { label: 'Free Lifting Height', path: 'performance.free_lifting_height' },
  { label: 'Tilting Angle', path: 'performance.tilting_angle' },

  // 3. Dimensi & Bobot
  { label: 'Overall Dimension', path: 'size.overall_dimension' },
  { label: 'Weight', path: 'size.weight' },
  { label: 'Wheelbase', path: 'performance.wheelbase' },
  { label: 'Tread', path: 'performance.tread' },
  { label: 'Turning Radius', path: 'dimensions.min_turning_radius' },

  // 4. Kecepatan & Mobilitas
  { label: 'Travel Speed (Laden)', path: 'speed.travel_laden' },
  { label: 'Lifting Speed (Laden)', path: 'speed.lifting_laden' },
  { label: 'Lowering Speed (Laden)', path: 'speed.lowering_laden' },
  { label: 'Gradeability (Laden)', path: 'gradeability.laden' },
  { label: 'Max Travel Speed', path: 'operating_range.max_travel_speed' },
  { label: 'Gradeability', path: 'operating_range.max_gradeability' },

  // 5. Sumber Tenaga
  { label: 'Battery', path: 'power.battery' },
  { label: 'Driven Motor', path: 'power.driven_motor' },
  { label: 'Pump Motor', path: 'power.pump_motor' },
  { label: 'Controller', path: 'power.controller' },

  // --- Spesifikasi Mini Excavator ---
  { label: 'Max Digging Depth', path: 'operating_range.max_digging_depth' },
  { label: 'Max Dumping Height', path: 'operating_range.max_dumping_height' },
  { label: 'Max Digging Radius', path: 'operating_range.max_digging_radius' },

  // --- Spesifikasi Wheel Loader ---
  { label: 'Operating Weight', path: 'basic_technical_data.operating_weight' },
  { label: 'Rated Load', path: 'basic_technical_data.rated_load' },
  {
    label: 'Rated Bucket Capacity',
    path: 'basic_technical_data.rated_bucket_capacity',
  },
  { label: 'Rated Power', path: 'basic_technical_data.rated_power' },
  { label: 'Max Breakout Force', path: 'operating_range.max_breakout_force' },
  { label: 'Cycle Time', path: 'operating_range.lift_dump_descend_time' },
  { label: 'Overall Length', path: 'dimensions.overall_length' },
  { label: 'Overall Height', path: 'dimensions.overall_height' },
  { label: 'Bucket Width', path: 'dimensions.bucket_width' },

  // --- Aerial Working Platform Essentials ---
  { label: 'Work Height', path: 'size.work_height' },
  { label: 'Platform Height', path: 'size.platform_height' },
  { label: 'Horizontal Outreach', path: 'size.horizontal_outreach' },
  { label: 'Up and Over Height', path: 'size.up_and_over_height' },
  { label: 'Below Ground Reach', path: 'size.below_ground_reach' },
  { label: 'Platform Length', path: 'size.platform_length' },
  { label: 'Platform Width', path: 'size.platform_width' },
  { label: 'Gross Weight', path: 'weight_and_pressure.gross_weight' },
  { label: 'Platform Capacity', path: 'performance.platform_capacity' },
  { label: 'Drive Speed', path: 'performance.drive_speed' },
  { label: 'Gradeability', path: 'performance.gradeability' },
  {
    label: 'Allowable Tilting Angle Driving',
    path: 'performance.allowable_tilting_angle_driving',
  },
  { label: 'Turntable Swing', path: 'performance.turntable_swing' },
  { label: 'Platform Rotation', path: 'performance.platform_rotation' },
  { label: 'Max Leveling Angle', path: 'performance.max_leveling_angle' },
  { label: 'Max Wind Speed', path: 'performance.max_wind_speed' },
  { label: 'Power Type', path: 'power.type' },
  { label: 'Battery Capacity', path: 'power.battery_capacity' },
  { label: 'Engine', path: 'power.engine' },
  { label: 'Crawler Type', path: 'undercarriage.crawler_type' },

  // Spesifikasi umum lainnya sebagai fallback
  {
    label: 'Standard Capacity',
    path: 'basic_technical_data.standard_capacity',
  },
  { label: 'Blade Capacity', path: 'basic_technical_data.blade_capacity' },
  {
    label: 'Max Lifting Capacity',
    path: 'lifting_performance.max_rated_lifting_capacity',
  },
];
