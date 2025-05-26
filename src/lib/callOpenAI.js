import.meta.env.VITE_OPENAI_API_KEY

export async function callOpenAI(prompt, { signal } = {}) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("API KEY:", apiKey);
    console.log("callOpenAI() triggered with prompt:", prompt);
  
    if (!apiKey) {
      throw new Error("Missing VITE_OPENAI_API_KEY");
    }
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-1106",
          max_tokens: 1000,
          messages: [
            {
              role: "system",
              content:
                "You are a warm, emotionally intelligent movie assistant. Recommend thoughtful, tone-matched films based on the user’s mood, intent, and energy. Avoid cliché blockbusters. Be conversational and emotionally intuitive.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
        const errText = await response.text();
        console.error("OpenAI response error:", response.status, errText);
        throw new Error(`OpenAI API error: ${response.status} – ${errText}`);
      }
  
      const data = await response.json();
      console.log("Full GPT response:", data);
  
      return data.choices?.[0]?.message?.content?.trim() || "GPT returned no content.";
    } catch (err) {
      console.error("GPT fetch failed:", err);
      throw err;
    }
  }