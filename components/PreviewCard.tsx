"use client";

import { BrandData } from "@/app/page";

interface PreviewCardProps {
  brandData: BrandData;
}

export function PreviewCard({ brandData }: PreviewCardProps) {
  const isEmpty = !brandData.name && !brandData.description && brandData.colors.length === 0;

  if (isEmpty) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Brand Preview</h3>
        <div className="text-center py-12 text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p>Fill out the form to see your brand preview</p>
        </div>
      </div>
    );
  }

  const primaryColor = brandData.colors[0] || "#3B82F6";
  const secondaryColor = brandData.colors[1] || "#6B7280";

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Brand Preview</h3>
      
      <div className="space-y-6">
        {/* Brand Identity Card */}
        <div className="border-2 border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            {/* Mock Logo */}
            <div 
              className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: primaryColor }}
            >
              {brandData.name.charAt(0).toUpperCase() || "?"}
            </div>
            
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-900">
                {brandData.name || "Brand Name"}
              </h4>
              {brandData.tone && (
                <span 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mt-1"
                  style={{ backgroundColor: secondaryColor }}
                >
                  {brandData.tone.charAt(0).toUpperCase() + brandData.tone.slice(1)}
                </span>
              )}
            </div>
          </div>

          {brandData.description && (
            <p className="text-gray-600 leading-relaxed mb-4">
              {brandData.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            {brandData.industry && (
              <div>
                <span className="font-medium text-gray-700">Industry:</span>
                <p className="text-gray-600">{brandData.industry}</p>
              </div>
            )}
            
            {brandData.targetAudience && (
              <div>
                <span className="font-medium text-gray-700">Audience:</span>
                <p className="text-gray-600">{brandData.targetAudience}</p>
              </div>
            )}
          </div>
        </div>

        {/* Color Palette */}
        {brandData.colors.length > 0 && (
          <div>
            <h5 className="font-medium text-gray-700 mb-3">Color Palette</h5>
            <div className="flex flex-wrap gap-2">
              {brandData.colors.map((color, index) => (
                <div key={color} className="text-center">
                  <div
                    className="w-12 h-12 rounded-lg border border-gray-300 mb-1"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-500">{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mock Brand Applications */}
        <div>
          <h5 className="font-medium text-gray-700 mb-3">Mock Applications</h5>
          <div className="grid grid-cols-2 gap-3">
            {/* Business Card Mock */}
            <div className="bg-gray-50 rounded-lg p-3 aspect-[1.6/1] flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  {brandData.name.charAt(0).toUpperCase() || "?"}
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {brandData.name || "Brand"}
                </span>
              </div>
              <div className="text-xs text-gray-500">Business Card</div>
            </div>

            {/* Letterhead Mock */}
            <div className="bg-gray-50 rounded-lg p-3 aspect-[1.6/1] flex flex-col">
              <div 
                className="h-2 rounded mb-2"
                style={{ backgroundColor: primaryColor }}
              />
              <div className="text-xs font-medium text-gray-700 mb-1">
                {brandData.name || "Brand Name"}
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-1 bg-gray-300 rounded w-full" />
                <div className="h-1 bg-gray-300 rounded w-3/4" />
                <div className="h-1 bg-gray-300 rounded w-1/2" />
              </div>
              <div className="text-xs text-gray-500 mt-2">Letterhead</div>
            </div>
          </div>
        </div>

        {/* Brand Metrics */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-gray-700 mb-3">Brand Completeness</h5>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Basic Info</span>
              <span className={brandData.name && brandData.description ? "text-green-600" : "text-yellow-600"}>
                {brandData.name && brandData.description ? "Complete" : "Partial"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Brand Colors</span>
              <span className={brandData.colors.length > 0 ? "text-green-600" : "text-gray-400"}>
                {brandData.colors.length > 0 ? `${brandData.colors.length} selected` : "None"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Brand Tone</span>
              <span className={brandData.tone ? "text-green-600" : "text-gray-400"}>
                {brandData.tone || "Not selected"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 