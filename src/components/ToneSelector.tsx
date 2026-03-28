"use client";

import React from "react";
import { Briefcase, Heart, Trophy, Smile } from "lucide-react";

export type Tone = "Professional" | "Inspirational" | "Humble brag" | "Funny";

interface ToneSelectorProps {
  selectedTone: Tone;
  onSelect: (tone: Tone) => void;
}

const tones: { label: Tone; icon: React.ReactNode }[] = [
  { label: "Professional", icon: <Briefcase size={16} /> },
  { label: "Inspirational", icon: <Trophy size={16} /> },
  { label: "Humble brag", icon: <Heart size={16} /> },
  { label: "Funny", icon: <Smile size={16} /> },
];

export const ToneSelector: React.FC<ToneSelectorProps> = ({
  selectedTone,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-slate-700 dark:text-slate-300 font-medium text-sm mb-1">
        Post Tone
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {tones.map((tone) => (
          <button
            key={tone.label}
            onClick={() => onSelect(tone.label)}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
              selectedTone === tone.label
                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/10"
            }`}
          >
            {tone.icon}
            {tone.label}
          </button>
        ))}
      </div>
    </div>
  );
};
