import React from "react";
import Settings from "./Settings";
import Icon from "./Icon";

const EmsHeader: React.FC<{ theme: string }> = ({ theme }) => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        {/* Example button */}
        <button
          className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-200 glove-friendly group"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <svg
            className="w-4 h-4 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* SVG content */}
          </svg>
        </button>
        <button className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-200 glove-friendly group hidden sm:block">
          <Settings className="w-5 h-5 text-secondary-foreground group-hover:rotate-90 transition-transform duration-300" />
        </button>
        {/* More header content */}
      </div>
    </header>
  );
};

export default EmsHeader;