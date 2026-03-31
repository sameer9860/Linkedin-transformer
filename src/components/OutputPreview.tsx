"use client";

import React, { useState } from "react";
import { Copy, Check, Eye, ThumbsUp, MessageCircle, Repeat2, Send } from "lucide-react";

interface OutputPreviewProps {
  content: string;
  isGenerating: boolean;
}

export const OutputPreview: React.FC<OutputPreviewProps> = ({
  content,
  isGenerating,
}) => {
  const [copied, setCopied] = useState(false);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date());

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = content.split("\n");
  const hashtagLines = lines.filter((line) => line.trim().startsWith("#"));
  const bodyLines = lines.filter((line) => !line.trim().startsWith("#"));

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

      <div className="relative min-h-[180px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-0 overflow-hidden shadow-sm">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500 animate-pulse">
              AI is refining your post...
            </p>
          </div>
        ) : content ? (
          <div className="flex flex-col">
            <div className="px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-900">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm">
                  LT
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    LinkedIn Transformer
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    AI Content Assistant
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {formattedDate} · <span className="text-[11px]">🌐</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed text-[15px]">
                {bodyLines.join("\n").trim()}
              </div>
              {hashtagLines.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {hashtagLines.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="text-sm text-blue-700 dark:text-blue-400 font-medium"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-900 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <span>Preview engagement</span>
                <span>Built for LinkedIn style readability</span>
              </div>
            </div>

            <div className="grid grid-cols-4 border-t border-slate-100 dark:border-slate-900">
              <button className="flex items-center justify-center gap-2 py-2.5 text-slate-500 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <ThumbsUp size={15} /> Like
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 text-slate-500 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <MessageCircle size={15} /> Comment
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 text-slate-500 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <Repeat2 size={15} /> Repost
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 text-slate-500 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <Send size={15} /> Send
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center text-slate-400 space-y-2 px-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-300 dark:text-slate-700 font-bold">
              In
            </div>
            <p className="text-sm">
              Your LinkedIn-style live preview will appear here once generated.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
