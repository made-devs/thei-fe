"use client";

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div
      className="
        flex flex-nowrap overflow-x-auto gap-0.5 mb-6 bg-gray-800 p-0.5 rounded-lg
        scrollbar-hide
        sm:flex-wrap sm:overflow-visible sm:gap-1 sm:p-1
      "
    >
      {/* Pseudo padding kiri */}
      <div className="w-2 flex-shrink-0 sm:hidden" aria-hidden="true" />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            px-2 py-0.5 text-[11px] font-semibold rounded-md transition
            flex-shrink-0
            ${
              activeTab === tab.id
                ? "bg-yellow-400 text-black shadow"
                : "text-yellow-400 hover:text-yellow-700"
            }
            sm:flex-1 sm:px-3 sm:py-2 sm:text-sm
          `}
        >
          {tab.label}
        </button>
      ))}
      {/* Pseudo padding kanan */}
      <div className="w-2 flex-shrink-0 sm:hidden" aria-hidden="true" />
    </div>
  );
};

export default TabNavigation;
