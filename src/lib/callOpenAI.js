export async function callOpenAI(prompt, { signal } = {}) {
  if (typeof prompt !== "string" || !prompt.trim()) {
    throw new Error("A recommendation prompt is required.");
  }

  try {
    const response = await fetch("/api/recommendations", {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `Recommendation request failed: ${response.status}`
      );
    }

    return data.content?.trim() || "No recommendations were returned.";
  } catch (error) {
    console.error("Recommendation request failed:", error);
    throw error;
  }
}