"use client";

import React from "react";
import { Zap } from "lucide-react";

interface CringeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const CringeSlider: React.FC<CringeSliderProps> = ({
  value,
  onChange,
}) => {
  const getCringeLabel = (val: number) => {
    if (val <= 10) return "Professional 👔";
    if (val <= 30) return "Modest 🤝";
    if (val <= 60) return "Humble Brag 💅";
    if (val <= 85) return "Thought Leader 🧠";
    return "Cringe King 👑";
  };

  const getCringeColor = (val: number) => {
    if (val <= 10) return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800";
    if (val <= 30) return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800";
    if (val <= 60) return "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-800";
    if (val <= 85) return "text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400 border-orange-100 dark:border-orange-800";
    return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border-red-100 dark:border-red-800";
  };

  return (
    <div className="flex flex-col gap-2 w-full animate-in fade-in slide-in-from-right-4 duration-700 delay-400 fill-mode-both">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
          <Zap size={18} className="text-orange-500 fill-orange-500/20" />
          <label htmlFor="cringe-slider">Cringe Factor</label>
        </div>
      </div>
      <div className="relative group py-2">
        <div className="flex justify-between items-center mb-4">
           <span className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all duration-500 shadow-sm ${getCringeColor(value)}`}>
            {getCringeLabel(value)}
          </span>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{value}%</span>
        </div>
        <input
          id="cringe-slider"
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-orange-500 group-hover:accent-orange-600 transition-all focus:outline-none focus:ring-4 focus:ring-orange-500/10"
        />
        <div className="flex justify-between mt-3 px-0.5">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Minimal</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Maximum</span>
        </div>
      </div>
    </div>
  );
};
