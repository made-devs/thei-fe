// Konfigurasi spesifikasi utama untuk setiap kategori produk
export const mainSpecConfig = {
  default: [
    {
      label: 'Operating Weight',
      path: 'basic_technical_data.operating_weight',
    },
    { label: 'Rated Power', path: 'basic_technical_data.rated_power' },
    {
      label: 'Standard Capacity',
      path: 'basic_technical_data.standard_capacity',
    },
  ],
  forklift: [
    { label: 'Rated Capacity', path: 'performance.rated_capacity' },
    { label: 'Lifting Height', path: 'performance.lifting_height' },
    { label: 'Turning Radius', path: 'performance.turning_radius' },
  ],
  excavator: [
    {
      label: 'Operating Weight',
      path: 'basic_technical_data.operating_weight',
    },
    { label: 'Rated Power', path: 'basic_technical_data.rated_power' },
    {
      label: 'Bucket Capacity',
      path: 'basic_technical_data.standard_capacity',
    },
  ],
  'mini-excavator': [
    {
      label: 'Operating Weight',
      path: 'basic_technical_data.operating_weight',
    },
    { label: 'Rated Power', path: 'basic_technical_data.rated_power' },
    {
      label: 'Bucket Capacity',
      path: 'basic_technical_data.standard_capacity',
    },
  ],
  'wheel-loader': [
    {
      label: 'Operating Weight',
      path: 'basic_technical_data.operating_weight',
    },
    { label: 'Rated Power', path: 'basic_technical_data.rated_power' },
    {
      label: 'Bucket Capacity',
      path: 'basic_technical_data.rated_bucket_capacity',
    },
  ],
  bulldozer: [
    {
      label: 'Operating Weight',
      path: 'basic_technical_data.operating_weight',
    },
    { label: 'Rated Power', path: 'basic_technical_data.rated_power' },
    { label: 'Blade Capacity', path: 'basic_technical_data.blade_capacity' },
  ],
  crane: [
    {
      label: 'Max Lifting Capacity',
      path: 'lifting_performance.max_rated_lifting_capacity',
    },
    {
      label: 'Max Lifting Height',
      path: 'lifting_performance.max_lifting_height_of_main_boom',
    },
    {
      label: 'Max Lifting Moment',
      path: 'lifting_performance.max_load_moment_of_basic_boom',
    },
  ],
  'crawler-crane': [
    {
      label: 'Max Lifting Capacity',
      path: 'technical_data.max_lifting_capacity',
    },
    { label: 'Main Boom Length', path: 'technical_data.main_boom_length' },
    { label: 'Max Lifting Moment', path: 'technical_data.max_lifting_moment' },
  ],
  'telescopic-crawler-crane': [
    {
      label: 'Max Lifting Capacity',
      path: 'technical_data.max_lifting_capacity',
    },
    { label: 'Main Boom Length', path: 'technical_data.main_boom_length' },
    { label: 'Max Lifting Moment', path: 'technical_data.max_lifting_moment' },
  ],
  'boom-lift': [
    { label: 'Work Height', path: 'size.work_height' },
    { label: 'Platform Capacity', path: 'performance.platform_capacity' },
    { label: 'Horizontal Outreach', path: 'size.horizontal_outreach' },
  ],
  'aerial-working-platform': [
    { label: 'Work Height', path: 'size.work_height' },
    { label: 'Platform Capacity', path: 'performance.platform_capacity' },
    { label: 'Horizontal Outreach', path: 'size.horizontal_outreach' },
  ],
  telehandler: [
    { label: 'Rated Capacity', path: 'size_and_performance.rated_capacity' },
    { label: 'Max Lift Height', path: 'size_and_performance.max_lift_height' },
    {
      label: 'Max Forward Reach',
      path: 'size_and_performance.max_forward_reach',
    },
  ],
  'skid-steer-loader': [
    {
      label: 'Operating Weight',
      path: 'basic_technical_data.operating_weight',
    },
    { label: 'Rated Power', path: 'basic_technical_data.rated_power' },
    { label: 'Bucket Capacity', path: 'basic_technical_data.bucket_capacity' },
  ],
  'concrete-pump-mixer': [
    { label: 'Max Output', path: 'pump_data.max_output' },
    { label: 'Reach Height', path: 'boom_data.reach_height' },
    {
      label: 'Agitator Capacity',
      path: 'mixing_drum_parameters.agitator_capacity',
    },
  ],
};
