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
    if (val < 25) return "Understated";
    if (val < 50) return "Balanced";
    if (val < 75) return "Engaging";
    return "Ultra-LinkedIn";
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium text-sm">
          <Zap size={18} className="text-orange-500" />
          <label htmlFor="cringe-slider">Cringe Factor</label>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
          {value}% — {getCringeLabel(value)}
        </span>
      </div>
      <div className="relative group py-2">
        <input
          id="cringe-slider"
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500 group-hover:accent-orange-600 transition-all focus:outline-none"
        />
        <div className="flex justify-between mt-2 px-1">
          <span className="text-[10px] text-slate-400 font-medium tracking-tight">CLASSIC</span>
          <span className="text-[10px] text-slate-400 font-medium tracking-tight">MAXIMUM ENGAGEMENT</span>
        </div>
      </div>
    </div>
  );
};
