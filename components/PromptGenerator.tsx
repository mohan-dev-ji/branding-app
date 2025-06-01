"use client";

import { useState } from "react";
import { BrandData } from "@/app/page";

interface PromptGeneratorProps {
  brandData: BrandData;
  onPromptsGenerated: (prompts: string[]) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

export function PromptGenerator({ 
  brandData, 
  onPromptsGenerated, 
  isGenerating, 
  setIsGenerating 
}: PromptGeneratorProps) {
  const [error, setError] = useState<string | null>(null);

  const canGenerate = brandData.name && brandData.description;

  const generatePrompts = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brandData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      onPromptsGenerated(data.prompts || []);
    } catch (err) {
      console.error("Error generating prompts:", err);
      setError(err instanceof Error ? err.message : "Failed to generate prompts");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        AI Logo Concepts
      </h2>
      
      <p className="text-gray-600 mb-6">
        Generate creative logo concept prompts based on your brand information using AI.
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={generatePrompts}
          disabled={!canGenerate || isGenerating}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            canGenerate && !isGenerating
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Concepts...
            </div>
          ) : (
            "Generate Logo Concepts"
          )}
        </button>

        {!canGenerate && (
          <p className="text-sm text-gray-500 text-center">
            Please fill in at least the brand name and description to generate concepts.
          </p>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">What this generates:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Detailed logo concept descriptions</li>
          <li>• Style and aesthetic recommendations</li>
          <li>• Symbol and icon suggestions</li>
          <li>• Typography and layout ideas</li>
        </ul>
      </div>
    </div>
  );
} 