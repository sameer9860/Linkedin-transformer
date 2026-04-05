"use client";

import React, { useState } from "react";
import { InputBox } from "./InputBox";
import { ToneSelector, Tone } from "./ToneSelector";
import { PlatformSelector, Platform } from "./PlatformSelector";
import { CringeSlider } from "./CringeSlider";
import { OutputPreview } from "./OutputPreview";
import { Sparkles, ArrowRight, Wand2, RefreshCw, Heart, Scissors, Check, Info } from "lucide-react";
import { toast } from "sonner";

export const LinkedInTransformer: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>("LinkedIn");
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [cringe, setCringe] = useState(50);
  const [output, setOutput] = useState("");
  const [hooks, setHooks] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTweaking, setIsTweaking] = useState(false);
  const [isGeneratingHooks, setIsGeneratingHooks] = useState(false);
  const [engagementScore, setEngagementScore] = useState<number | null>(null);
  const [engagementSuggestions, setEngagementSuggestions] = useState<string[]>([]);

  const callGenerateApi = async (action: "generate" | "shorter" | "emotional" | "regenerate" | "hooks" | "analyze") => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: inputText,
        platform,
        tone,
        cringe,
        action,
        currentOutput: output,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate post");
    }

    return data;
  };

  const handleGenerate = async () => {
    if (!inputText) return;
    
    setIsGenerating(true);
    try {
      const data = await callGenerateApi("generate");
      setOutput(data.output);
      setHooks([]);
      toast.success("Post generated successfully!", {
        description: `Your ${platform} post is ready.`,
      });
      // Analyze engagement after generation
      await analyzeEngagement(data.output);
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error("Generation failed", {
        description: error.message,
      });
      setOutput(`Error: ${error.message}. Make sure you have a GEMINI_API_KEY in your .env`);
      setEngagementScore(null);
      setEngagementSuggestions([]);
    } finally {
      setIsGenerating(false);
    }
  };

  const analyzeEngagement = async (content: string) => {
    if (!content) {
      setEngagementScore(null);
      setEngagementSuggestions([]);
      return;
    }

    try {
      const data = await callGenerateApi("analyze");
      setEngagementScore(data.score);
      setEngagementSuggestions(data.suggestions || []);
    } catch (error: any) {
      console.error("Analysis error:", error);
      // Set default values if analysis fails
      setEngagementScore(75);
      setEngagementSuggestions(["Consider adding more specific details", "Try including a question to encourage engagement"]);
    }
  };

  const handleAdjust = async (action: "shorter" | "emotional" | "regenerate") => {
    if (!inputText || !output) return;

    setIsTweaking(true);
    try {
      const data = await callGenerateApi(action);
      setOutput(data.output);
      toast.success(`Post ${action === 'shorter' ? 'shortened' : action === 'emotional' ? 'emotionally enhanced' : 'regenerated'}!`);
      // Re-analyze engagement after adjustment
      await analyzeEngagement(data.output);
    } catch (error: any) {
      console.error("Adjustment error:", error);
      toast.error("Adjustment failed", {
        description: error.message,
      });
      setOutput(`Error: ${error.message}. Make sure you have a GEMINI_API_KEY in your .env`);
    } finally {
      setIsTweaking(false);
    }
  };

  const handleGenerateHooks = async () => {
    if (!inputText) return;

    setIsGeneratingHooks(true);
    try {
      const data = await callGenerateApi("hooks");
      setHooks(Array.isArray(data.hooks) ? data.hooks : []);
      toast.info("Hook options generated", {
        description: "Choose one to replace your current hook.",
        icon: <Wand2 size={16} className="text-blue-500" />
      });
    } catch (error: any) {
      console.error("Hook generation error:", error);
      toast.error("Failed to generate hooks");
      setOutput(`Error: ${error.message}. Make sure you have a GEMINI_API_KEY in your .env`);
    } finally {
      setIsGeneratingHooks(false);
    }
  };

  const applyHook = (selectedHook: string) => {
    if (!output) return;
    const lines = output.split("\n");
    const firstMeaningfulLineIndex = lines.findIndex((line) => line.trim().length > 0);

    if (firstMeaningfulLineIndex === -1) {
      setOutput(selectedHook);
      return;
    }

    lines[firstMeaningfulLineIndex] = selectedHook;
    setOutput(lines.join("\n"));
    toast.success("Hook applied!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-1000 slide-in-from-bottom-8">
      <div className="flex flex-col gap-8">
        <div className="text-center space-y-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold tracking-wide uppercase border border-blue-100 dark:border-blue-800 animate-in zoom-in duration-700 delay-300 fill-mode-both">
            <Sparkles size={14} /> AI-Powered Content Transformation
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight animate-in slide-in-from-top-4 duration-700 delay-100 fill-mode-both">
            LinkedIn <span className="text-blue-600 text-gradient">Transformer</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-500 fill-mode-both">
            Turn your rough thoughts into posts for LinkedIn, Twitter/X, or Instagram in seconds.
            Stop staring at a blank screen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
            <InputBox value={inputText} onChange={setInputText} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <PlatformSelector selectedPlatform={platform} onSelect={setPlatform} />
              <ToneSelector selectedTone={tone} onSelect={setTone} />
              <CringeSlider value={cringe} onChange={setCringe} />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!inputText || isGenerating || isTweaking || isGeneratingHooks}
              className={`w-full group flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                !inputText || isGenerating || isTweaking || isGeneratingHooks
                  ? "bg-slate-100 dark:bg-slate-900 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-800"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 active:transform active:scale-[0.98]"
              }`}
            >
              {isGenerating ? (
                <>Transmitting...</>
              ) : (
                <>
                  Generate Post
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => handleAdjust("shorter")}
                disabled={!output || isGenerating || isTweaking || isGeneratingHooks}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <Scissors size={16} /> Make shorter
              </button>
              <button
                onClick={() => handleAdjust("emotional")}
                disabled={!output || isGenerating || isTweaking || isGeneratingHooks}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <Heart size={16} /> More emotional
              </button>
              <button
                onClick={() => handleAdjust("regenerate")}
                disabled={!output || isGenerating || isTweaking || isGeneratingHooks}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <RefreshCw size={16} className={isTweaking ? "animate-spin" : ""} /> Regenerate
              </button>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 bg-slate-50/70 dark:bg-slate-900/30">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Hook Generator</p>
                <button
                  onClick={handleGenerateHooks}
                  disabled={!inputText || isGenerating || isTweaking || isGeneratingHooks}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wand2 size={14} className={isGeneratingHooks ? "animate-pulse" : ""} />
                  {isGeneratingHooks ? "Generating..." : "Generate 3 hooks"}
                </button>
              </div>

              {hooks.length > 0 ? (
                <div className="space-y-2">
                  {hooks.map((hook, index) => (
                    <button
                      key={`${hook}-${index}`}
                      onClick={() => applyHook(hook)}
                      disabled={!output}
                      className="w-full text-left px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {index + 1}. {hook}
                    </button>
                  ))}
                  {!output && (
                    <p className="text-xs text-slate-500">
                      Generate a post first, then click a hook to apply it.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Generate hook options to test different opening lines.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <OutputPreview 
              content={output} 
              platform={platform} 
              isGenerating={isGenerating}
              engagementScore={engagementScore}
              engagementSuggestions={engagementSuggestions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
