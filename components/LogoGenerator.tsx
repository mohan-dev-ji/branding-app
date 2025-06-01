"use client";

import { useState } from "react";
import Image from "next/image";

interface GeneratedLogo {
  imageUrl: string;
  prompt: string;
  originalPrompt: string;
  brandName: string;
  id: string;
}

interface LogoGeneratorProps {
  prompts: string[];
  brandName: string;
}

export function LogoGenerator({ prompts, brandName }: LogoGeneratorProps) {
  const [generatedLogos, setGeneratedLogos] = useState<GeneratedLogo[]>([]);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateLogo = async (prompt: string) => {
    setIsGenerating(prompt);
    setError(null);

    try {
      const response = await fetch("/api/generate-logo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, brandName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate logo");
      }

      const data = await response.json();
      
      const newLogo: GeneratedLogo = {
        ...data,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };

      setGeneratedLogos(prev => [...prev, newLogo]);
    } catch (err) {
      console.error("Error generating logo:", err);
      setError(err instanceof Error ? err.message : "Failed to generate logo");
    } finally {
      setIsGenerating(null);
    }
  };

  const downloadLogo = async (logoUrl: string, brandName: string, logoId: string) => {
    try {
      const filename = `${brandName.toLowerCase().replace(/\s+/g, '-')}-logo-${logoId}.png`;
      
      // Use our proxy API to download the image
      const proxyUrl = `/api/download-logo?url=${encodeURIComponent(logoUrl)}&filename=${encodeURIComponent(filename)}`;
      
      const link = document.createElement('a');
      link.href = proxyUrl;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading logo:", err);
      setError("Failed to download logo. Please try again.");
    }
  };

  const removeLogo = (logoId: string) => {
    setGeneratedLogos(prev => prev.filter(logo => logo.id !== logoId));
  };

  if (prompts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Logo Generation</h3>
        <div className="text-center py-8 text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p>Generate logo concepts first to create actual logos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Logo Generation</h3>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Prompt Cards */}
      <div className="space-y-4 mb-8">
        <h4 className="font-medium text-gray-700">Generate logos from concepts:</h4>
        {prompts.map((prompt, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-3">{prompt}</p>
            <button
              onClick={() => generateLogo(prompt)}
              disabled={isGenerating === prompt}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isGenerating === prompt
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isGenerating === prompt ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </div>
              ) : (
                "Generate Logo"
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Generated Logos */}
      {generatedLogos.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-4">Generated Logos:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generatedLogos.map((logo) => (
              <div key={logo.id} className="border border-gray-200 rounded-lg p-4">
                <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={logo.imageUrl}
                    alt={`Logo for ${logo.brandName}`}
                    fill
                    className="object-contain"
                    onError={() => {
                      setError("Failed to load generated logo image");
                    }}
                  />
                </div>
                
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                  {logo.originalPrompt}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadLogo(logo.imageUrl, logo.brandName, logo.id)}
                    className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Download PNG
                  </button>
                  <button
                    onClick={() => removeLogo(logo.id)}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">About DALL-E 3 Logo Generation:</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• High-quality AI-generated logos in 1024x1024 resolution</li>
          <li>• Each generation takes 10-30 seconds</li>
          <li>• Logos are optimized for business use</li>
          <li>• Download as PNG files for immediate use</li>
        </ul>
      </div>
    </div>
  );
} 