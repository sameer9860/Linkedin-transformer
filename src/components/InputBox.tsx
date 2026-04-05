"use client";

import React from "react";
import { MessageSquareText, Info } from "lucide-react";

interface InputBoxProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export const InputBox: React.FC<InputBoxProps> = ({
  value,
  onChange,
  maxLength = 1000,
}) => {
  const isNearLimit = value.length > maxLength * 0.9;
  const isAtLimit = value.length >= maxLength;

  return (
    <div className="flex flex-col gap-2 w-full animate-in fade-in slide-in-from-left-4 duration-700 delay-200 fill-mode-both">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
          <MessageSquareText size={18} className="text-blue-600" />
          <label htmlFor="input-text">Your Raw Thoughts</label>
        </div>
        <div className="group relative flex items-center">
          <Info size={14} className="text-slate-400 hover:text-blue-500 transition-colors cursor-help" />
          <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Paste anything—notes, transcripts, or rough ideas. The AI will handle the rest.
          </div>
        </div>
      </div>
      <div className="relative group">
        <textarea
          id="input-text"
          className={`w-full min-h-[220px] p-5 rounded-2xl border-2 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none shadow-sm text-base leading-relaxed ${
            isAtLimit 
              ? "border-red-200 dark:border-red-900/50" 
              : isNearLimit 
                ? "border-yellow-200 dark:border-yellow-900/50" 
                : "border-slate-100 dark:border-slate-800 focus:border-blue-500"
          }`}
          placeholder="Paste your rough thoughts, a blog post, or a transcript here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
        />
        <div className={`absolute bottom-4 right-4 text-[10px] font-bold tracking-wider px-2 py-1 rounded-full backdrop-blur-md border transition-all duration-300 ${
          isAtLimit 
            ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800" 
            : isNearLimit 
              ? "bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800" 
              : "bg-slate-50/80 text-slate-500 border-slate-100 dark:bg-slate-900/80 dark:text-slate-400 dark:border-slate-800"
        }`}>
          {value.length.toLocaleString()} / {maxLength.toLocaleString()}
        </div>
      </div>
    </div>
  );
};
