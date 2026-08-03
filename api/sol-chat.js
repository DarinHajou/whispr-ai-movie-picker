import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter(
      (message) =>
        ["user", "assistant"].includes(message?.role) &&
        typeof message?.content === "string" &&
        message.content.trim()
    )
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }));
}

function formatRecommendations(recommendations) {
  if (!Array.isArray(recommendations)) {
    return "";
  }

  return recommendations
    .slice(0, 6)
    .map((movie, index) => {
      const title = movie?.title || "Unknown title";
      const year = movie?.year ? ` (${movie.year})` : "";
      const tone = movie?.tone || "No tone supplied";

      return `${index + 1}. ${title}${year}
Emotional tone: ${tone}`;
    })
    .join("\n\n");
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Method not allowed",
    });
  }

  const {
    craving,
    intensity,
    recommendations,
    messages,
  } = request.body ?? {};

  const conversation = normalizeMessages(messages);
  const formattedRecommendations =
    formatRecommendations(recommendations);

  if (!craving?.trim() || !intensity?.trim()) {
    return response.status(400).json({
      error: "Craving and intensity are required",
    });
  }

  if (!formattedRecommendations) {
    return response.status(400).json({
      error: "Recommendations are required",
    });
  }

  if (
    conversation.length === 0 ||
    conversation.at(-1)?.role !== "user"
  ) {
    return response.status(400).json({
      error: "A user message is required",
    });
  }

  const instructions = `
You are Sol, Whisper's thoughtful movie curator.

The user selected this cinematic craving:
${craving}

Their selected intensity:
${intensity}

Whisper currently recommended these six films:

${formattedRecommendations}

The first film is Sol's primary recommendation for tonight.

Your role is to help the user understand, compare, or refine this specific recommendation set.

Guidelines:

- Preserve the selected craving and intensity unless the user asks to change direction.
- Focus primarily on the emotional viewing experience.
- Use the current six films as the context for the conversation.
- Compare films clearly when the user asks.
- Explain why a film fits without repeating its entire tone description.
- Recommend a different film only when the user asks for another option.
- Do not invent ratings, streaming availability, runtimes, cast details, release years, or plot facts.
- Keep answers conversational and reasonably concise.
- Do not present yourself as a general-purpose assistant.
- Do not restart the conversation with a greeting on every response.
  `.trim();

  try {
    const result = await openai.responses.create({
      model: "gpt-4.1-mini",
      instructions,
      input: conversation,
      max_output_tokens: 300,
      store: false,
    });

    return response.status(200).json({
      content: result.output_text,
    });
  } catch (error) {
    console.error("Sol chat request failed:", error);

    return response.status(error.status ?? 500).json({
      error: error.message ?? "Sol chat request failed",
    });
  }
}