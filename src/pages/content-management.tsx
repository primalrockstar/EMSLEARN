import React from "react";
import Icon from "../components/Icon";

const tabs = [{ name: "Tab1" }, { name: "Tab2" }];

const ContentManagement: React.FC = () => (
  <div>
    <nav>
      {tabs.map((tab, idx) => (
        <button
          key={idx}
          className="flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors"
        >
          <Icon className="w-5 h-5" />
          <span>{tab.name}</span>
        </button>
      ))}
    </nav>
    {/* Tab Content */}
  </div>
);

export default ContentManagement;