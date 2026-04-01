"use client";

import React from "react";
import { Briefcase, Camera, MessageSquare } from "lucide-react";

export type Platform = "LinkedIn" | "Twitter/X" | "Instagram";

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onSelect: (platform: Platform) => void;
}

const platforms: { label: Platform; icon: React.ReactNode }[] = [
  { label: "LinkedIn", icon: <Briefcase size={16} /> },
  { label: "Twitter/X", icon: <MessageSquare size={16} /> },
  { label: "Instagram", icon: <Camera size={16} /> },
];

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-slate-700 dark:text-slate-300 font-medium text-sm mb-1">
        Platform
      </label>
      <div className="grid grid-cols-3 gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.label}
            onClick={() => onSelect(platform.label)}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
              selectedPlatform === platform.label
                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/10"
            }`}
          >
            {platform.icon}
            {platform.label}
          </button>
        ))}
      </div>
    </div>
  );
};
