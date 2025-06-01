"use client";

import { useState } from "react";
import { BrandForm } from "@/components/BrandForm";
import { PreviewCard } from "@/components/PreviewCard";
import { PromptGenerator } from "@/components/PromptGenerator";

export interface BrandData {
  name: string;
  description: string;
  colors: string[];
  tone: "modern" | "classic" | "playful" | "professional" | "bold" | "";
  industry: string;
  targetAudience: string;
}

export default function Home() {
  const [brandData, setBrandData] = useState<BrandData>({
    name: "",
    description: "",
    colors: [],
    tone: "",
    industry: "",
    targetAudience: "",
  });

  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
  const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false);

  const handleBrandDataChange = (data: BrandData) => {
    setBrandData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Brand Logo Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create stunning logos for your brand with AI-powered design suggestions.
            Start by telling us about your brand.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <BrandForm 
              brandData={brandData} 
              onBrandDataChange={handleBrandDataChange}
            />
            
            <PromptGenerator 
              brandData={brandData}
              onPromptsGenerated={setGeneratedPrompts}
              isGenerating={isGeneratingPrompts}
              setIsGenerating={setIsGeneratingPrompts}
            />
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <PreviewCard brandData={brandData} />
            
            {generatedPrompts.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Generated Logo Concepts
                </h3>
                <div className="space-y-3">
                  {generatedPrompts.map((prompt, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                    >
                      <p className="text-sm text-gray-700">{prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
