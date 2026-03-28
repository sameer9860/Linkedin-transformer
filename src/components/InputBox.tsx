"use client";

import React from "react";
import { MessageSquareText } from "lucide-react";

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
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium text-sm mb-1">
        <MessageSquareText size={18} className="text-blue-600" />
        <label htmlFor="input-text">Your Content</label>
      </div>
      <div className="relative group">
        <textarea
          id="input-text"
          className="w-full min-h-[200px] p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-sm"
          placeholder="Paste your rough thoughts, a blog post, or a transcript here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
        />
        <div className="absolute bottom-3 right-3 text-xs font-medium text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-md backdrop-blur-sm">
          {value.length} / {maxLength}
        </div>
      </div>
      <p className="text-[11px] text-slate-500 mt-1 italic">
        Tip: Paste more context for better AI understanding.
      </p>
    </div>
  );
};
