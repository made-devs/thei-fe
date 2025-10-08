'use client';

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-1 mb-6 bg-gray-800 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 px-3 py-2 text-sm font-semibold rounded-md transition ${
            activeTab === tab.id
              ? 'bg-yellow-400 text-black shadow'
              : 'text-yellow-400 hover:text-yellow-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
