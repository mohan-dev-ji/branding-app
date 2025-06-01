import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI - you'll need to set OPENAI_API_KEY in your environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const brandData = await request.json();
    
    if (!brandData.name || !brandData.description) {
      return NextResponse.json(
        { error: "Brand name and description are required" },
        { status: 400 }
      );
    }

    // Construct the prompt for OpenAI
    const systemPrompt = `You are a professional logo designer and brand strategist. Generate 3-4 distinct, creative logo concept prompts based on the provided brand information. Each prompt should be detailed enough for an AI image generator to create a logo.

Guidelines for logo prompts:
- Be specific about visual style, layout, and composition
- Include typography recommendations when relevant
- Suggest appropriate symbols, icons, or abstract elements
- Consider the brand's tone and target audience
- Make each concept unique and distinct from the others
- Focus on creating prompts suitable for logo generation (clean, simple, scalable designs)
- Keep prompts concise but descriptive (2-3 sentences each)

Format your response as a JSON array of strings, where each string is a complete logo concept prompt.`;

    const userPrompt = `Brand Name: ${brandData.name}
Description: ${brandData.description}
${brandData.industry ? `Industry: ${brandData.industry}` : ''}
${brandData.targetAudience ? `Target Audience: ${brandData.targetAudience}` : ''}
${brandData.tone ? `Brand Tone: ${brandData.tone}` : ''}
${brandData.colors.length > 0 ? `Preferred Colors: ${brandData.colors.join(', ')}` : ''}

Generate logo concept prompts for this brand.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    // Try to parse the JSON response
    let prompts: string[];
    try {
      prompts = JSON.parse(responseContent);
      
      // Validate that it's an array of strings
      if (!Array.isArray(prompts) || !prompts.every(p => typeof p === 'string')) {
        throw new Error("Invalid response format");
      }
    } catch (parseError) {
      // Fallback: if JSON parsing fails, split by numbered lists or newlines
      console.warn("Failed to parse JSON, using fallback parsing");
      prompts = responseContent
        .split(/\d+\.\s+/)
        .filter(prompt => prompt.trim().length > 0)
        .map(prompt => prompt.trim())
        .slice(0, 4); // Limit to 4 prompts
    }

    return NextResponse.json({ prompts });

  } catch (error) {
    console.error("Error generating prompts:", error);
    
    if (error instanceof Error && error.message.includes("API key")) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to generate logo concepts" },
      { status: 500 }
    );
  }
} 