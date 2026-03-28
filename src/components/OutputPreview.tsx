"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, Eye } from "lucide-react";

interface OutputPreviewProps {
  content: string;
  isGenerating: boolean;
}

export const OutputPreview: React.FC<OutputPreviewProps> = ({
  content,
  isGenerating,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium text-sm">
          <Eye size={18} className="text-blue-600" />
          <span>Final Post Preview</span>
        </div>
        {content && (
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              copied
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {copied ? (
              <>
                <Check size={14} /> Copied!
              </>
            ) : (
              <>
                <Copy size={14} /> Copy Post
              </>
            )}
          </button>
        )}
      </div>

      <div className="relative min-h-[160px] rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/5 p-6 overflow-hidden">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500 animate-pulse">
              AI is refining your post...
            </p>
          </div>
        ) : content ? (
          <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-[15px]">
            {content}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center text-slate-400 space-y-2">
            <Share2 size={32} className="opacity-20" />
            <p className="text-sm">
              Your transformed post will appear here once generated.
            </p>
          </div>
        )}
        
        {/* Subtle decorative elements for a premium feel */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>
      </div>
    </div>
  );
};
