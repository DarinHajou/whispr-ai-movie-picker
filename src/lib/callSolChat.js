export default async function callSolChat({
  craving,
  intensity,
  recommendations,
  messages,
}) {
  const response = await fetch("/api/sol-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      craving,
      intensity,
      recommendations,
      messages,
    }),
  });

  const responseText = await response.text();

  let data = {};

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error("Sol returned an invalid response.");
    }
  }

  if (!response.ok) {
    throw new Error(data.error || "Could not reach Sol.");
  }

  if (!data.content?.trim()) {
    throw new Error("Sol returned an empty response.");
  }

  return data.content.trim();
}