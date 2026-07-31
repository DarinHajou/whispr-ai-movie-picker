// api/recommendations.js

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Method not allowed",
    });
  }

  const { prompt } = request.body ?? {};

  if (!prompt?.trim()) {
    return response.status(400).json({
      error: "Prompt is required",
    });
  }

  try {
    const result = await openai.responses.create({
      model: "gpt-5-mini",
      instructions:
        "You are a warm, emotionally intelligent movie assistant. Recommend thoughtful, tone-matched films based on the user's mood and energy.",
      input: prompt,
    });

    return response.status(200).json({
      content: result.output_text,
    });
  } catch (error) {
    console.error("Recommendation request failed:", error);

    return response.status(error.status ?? 500).json({
      error: error.message ?? "Recommendation request failed",
    });
  }
}