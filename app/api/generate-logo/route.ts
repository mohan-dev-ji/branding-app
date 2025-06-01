import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, brandName } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Enhance the prompt for better logo generation
    const enhancedPrompt = `Professional logo design: ${prompt}. Clean, simple, scalable vector-style design suitable for business use. White or transparent background. High contrast. Minimalist and modern aesthetic.`;

    console.log("Generating logo with prompt:", enhancedPrompt);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid",
    });

    const imageUrl = response.data?.[0]?.url;
    
    if (!imageUrl) {
      throw new Error("No image URL returned from DALL-E 3");
    }

    return NextResponse.json({ 
      imageUrl,
      prompt: enhancedPrompt,
      originalPrompt: prompt,
      brandName: brandName || "Brand"
    });

  } catch (error) {
    console.error("Error generating logo:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("content_policy_violation")) {
        return NextResponse.json(
          { error: "The prompt was rejected by OpenAI's content policy. Please try a different concept." },
          { status: 400 }
        );
      }
      
      if (error.message.includes("rate_limit")) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please wait a moment before generating another logo." },
          { status: 429 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Failed to generate logo. Please try again." },
      { status: 500 }
    );
  }
} 