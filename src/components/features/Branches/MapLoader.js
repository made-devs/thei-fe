"use client";

import dynamic from "next/dynamic";

// Gunakan dynamic import di dalam Client Component
const InteractiveMap = dynamic(
  () => import("@/components/features/Branches/InteractiveMap"),
  {
    ssr: false,
    // Placeholder yang akan ditampilkan saat peta sedang dimuat
    loading: () => (
      <div className="h-[65vh] w-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading Map...</p>
      </div>
    ),
  }
);

// Wrapper component yang akan dipanggil dari Server Component
const MapLoader = ({ dictionary }) => {
  return <InteractiveMap dictionary={dictionary} />;
};

export default MapLoader;
