"use client";

import React from "react";
import { Briefcase, MessageSquare, Camera, Layout } from "lucide-react";

export type Platform = "LinkedIn" | "Twitter/X" | "Instagram";

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onSelect: (platform: Platform) => void;
}

const platforms: { label: Platform; icon: React.ReactNode; description: string }[] = [
  { 
    label: "LinkedIn", 
    icon: <Briefcase size={16} />, 
    description: "Professional Network" 
  },
  { 
    label: "Twitter/X", 
    icon: <MessageSquare size={16} />, 
    description: "Short & Punchy" 
  },
  { 
    label: "Instagram", 
    icon: <Camera size={16} />, 
    description: "Visual Storytelling" 
  },
];

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full animate-in fade-in slide-in-from-left-4 duration-700 delay-200 fill-mode-both">
      <div className="flex items-center gap-2 mb-1">
        <Layout size={16} className="text-blue-500" />
        <label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
          Target Platform
        </label>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.label}
            onClick={() => onSelect(platform.label)}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group text-left ${
              selectedPlatform === platform.label
                ? "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 ring-2 ring-blue-500/20 shadow-md transform scale-[1.02]"
                : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-900 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
            }`}
          >
            <div className={`p-2 rounded-lg transition-colors duration-300 ${
              selectedPlatform === platform.label
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-100 dark:bg-slate-900 text-slate-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600"
            }`}>
              {platform.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`text-sm font-bold truncate ${
                selectedPlatform === platform.label ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
              }`}>
                {platform.label}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-500 font-medium truncate uppercase tracking-wider">
                {platform.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
