"use client";

import React from "react";
import { Briefcase, Heart, Trophy, Smile, Sparkles, Wand2, MessageCircle, BarChart3 } from "lucide-react";

export type Tone = "Professional" | "Inspirational" | "Humble brag" | "Funny";

interface ToneSelectorProps {
  selectedTone: Tone;
  onSelect: (tone: Tone) => void;
}

const tones: { label: Tone; icon: React.ReactNode; description: string; color: string }[] = [
  { 
    label: "Professional", 
    icon: <Briefcase size={16} />, 
    description: "Expert & Authoritative",
    color: "blue"
  },
  { 
    label: "Inspirational", 
    icon: <Trophy size={16} />, 
    description: "Motivating & Visionary",
    color: "amber"
  },
  { 
    label: "Humble brag", 
    icon: <Heart size={16} />, 
    description: "Social Proof with Grace",
    color: "emerald"
  },
  { 
    label: "Funny", 
    icon: <Smile size={16} />, 
    description: "Witty & Engaging",
    color: "indigo"
  },
];

export const ToneSelector: React.FC<ToneSelectorProps> = ({
  selectedTone,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full animate-in fade-in slide-in-from-left-4 duration-700 delay-300 fill-mode-both">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={16} className="text-blue-500" />
        <label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
          Desired Tone
        </label>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {tones.map((tone) => (
          <button
            key={tone.label}
            onClick={() => onSelect(tone.label)}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group text-left ${
              selectedTone === tone.label
                ? "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 ring-2 ring-blue-500/20 shadow-md transform scale-[1.02]"
                : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-900 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
            }`}
          >
            <div className={`p-2 rounded-lg transition-colors duration-300 ${
              selectedTone === tone.label
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-100 dark:bg-slate-900 text-slate-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600"
            }`}>
              {tone.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`text-sm font-bold truncate ${
                selectedTone === tone.label ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
              }`}>
                {tone.label}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-500 font-medium truncate uppercase tracking-wider">
                {tone.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
