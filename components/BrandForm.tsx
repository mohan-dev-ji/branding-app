"use client";

import { useState } from "react";
import { BrandData } from "@/app/page";

interface BrandFormProps {
  brandData: BrandData;
  onBrandDataChange: (data: BrandData) => void;
}

const toneOptions = [
  { value: "modern", label: "Modern", description: "Clean, minimalist, contemporary" },
  { value: "classic", label: "Classic", description: "Timeless, elegant, traditional" },
  { value: "playful", label: "Playful", description: "Fun, creative, energetic" },
  { value: "professional", label: "Professional", description: "Corporate, trustworthy, reliable" },
  { value: "bold", label: "Bold", description: "Strong, impactful, confident" },
] as const;

const predefinedColors = [
  "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6",
  "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#6366F1",
  "#14B8A6", "#F43F5E", "#8B5A2B", "#1F2937", "#6B7280"
];

export function BrandForm({ brandData, onBrandDataChange }: BrandFormProps) {
  const [customColor, setCustomColor] = useState("");

  const handleInputChange = (field: keyof BrandData, value: string) => {
    onBrandDataChange({
      ...brandData,
      [field]: value,
    });
  };

  const handleColorToggle = (color: string) => {
    const newColors = brandData.colors.includes(color)
      ? brandData.colors.filter(c => c !== color)
      : [...brandData.colors, color];
    
    onBrandDataChange({
      ...brandData,
      colors: newColors,
    });
  };

  const addCustomColor = () => {
    if (customColor && !brandData.colors.includes(customColor)) {
      onBrandDataChange({
        ...brandData,
        colors: [...brandData.colors, customColor],
      });
      setCustomColor("");
    }
  };

  const removeColor = (color: string) => {
    onBrandDataChange({
      ...brandData,
      colors: brandData.colors.filter(c => c !== color),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Brand Information</h2>
      
      <div className="space-y-6">
        {/* Brand Name */}
        <div>
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-2">
            Brand Name *
          </label>
          <input
            type="text"
            id="brandName"
            value={brandData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-400"
            placeholder="Enter your brand name"
          />
        </div>

        {/* Brand Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Brand Description *
          </label>
          <textarea
            id="description"
            value={brandData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-gray-900 placeholder-gray-400"
            placeholder="Describe what your brand does and what makes it unique..."
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <input
            type="text"
            id="industry"
            value={brandData.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-400"
            placeholder="e.g., Technology, Healthcare, Fashion..."
          />
        </div>

        {/* Target Audience */}
        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
            Target Audience
          </label>
          <input
            type="text"
            id="targetAudience"
            value={brandData.targetAudience}
            onChange={(e) => handleInputChange("targetAudience", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-400"
            placeholder="e.g., Young professionals, Families, Small businesses..."
          />
        </div>

        {/* Brand Tone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Brand Tone
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {toneOptions.map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer p-4 border-2 rounded-lg transition-colors ${
                  brandData.tone === option.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={option.value}
                  checked={brandData.tone === option.value}
                  onChange={(e) => handleInputChange("tone", e.target.value)}
                  className="sr-only"
                />
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Brand Colors
          </label>
          
          {/* Predefined Colors */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {predefinedColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorToggle(color)}
                className={`w-12 h-12 rounded-lg border-2 transition-all ${
                  brandData.colors.includes(color)
                    ? "border-gray-900 scale-95"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Custom Color Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              placeholder="#000000"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
            <button
              onClick={addCustomColor}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Selected Colors */}
          {brandData.colors.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {brandData.colors.map((color) => (
                <div
                  key={color}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
                >
                  <div
                    className="w-4 h-4 rounded border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-gray-700">{color}</span>
                  <button
                    onClick={() => removeColor(color)}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 