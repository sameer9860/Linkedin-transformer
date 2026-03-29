"use client";

import React, { useState } from "react";
import { InputBox } from "./InputBox";
import { ToneSelector, Tone } from "./ToneSelector";
import { CringeSlider } from "./CringeSlider";
import { OutputPreview } from "./OutputPreview";
import { Sparkles, ArrowRight } from "lucide-react";

export const LinkedInTransformer: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [cringe, setCringe] = useState(50);
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!inputText) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: inputText,
          tone,
          cringe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate post");
      }

      setOutput(data.output);
    } catch (error: any) {
      console.error("Generation error:", error);
      setOutput(`Error: ${error.message}. Make sure you have an OPENAI_API_KEY in your .env`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col gap-8">
        <div className="text-center space-y-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold tracking-wide uppercase border border-blue-100 dark:border-blue-800">
            <Sparkles size={14} /> AI-Powered Content Transformation
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            LinkedIn <span className="text-blue-600">Transformer</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Turn your raw thoughts into high-engagement professional posts in seconds. 
            Stop staring at a blank screen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
            <InputBox value={inputText} onChange={setInputText} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <ToneSelector selectedTone={tone} onSelect={setTone} />
              <CringeSlider value={cringe} onChange={setCringe} />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!inputText || isGenerating}
              className={`w-full group flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                !inputText || isGenerating
                  ? "bg-slate-100 dark:bg-slate-900 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-800"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 active:transform active:scale-[0.98]"
              }`}
            >
              {isGenerating ? (
                <>Transmiting...</>
              ) : (
                <>
                  Generate Post
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <OutputPreview content={output} isGenerating={isGenerating} />
          </div>
        </div>
      </div>
    </div>
  );
};
