import React, { useState } from 'react';

export function Tabs({ tabs, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full">
      <div className="flex border-b border-border mb-8 overflow-x-auto hide-scrollbar">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-8 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === index ? 'border-accent text-accent' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border-hover'}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="outline-none focus:outline-none animate-in fade-in duration-300">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
