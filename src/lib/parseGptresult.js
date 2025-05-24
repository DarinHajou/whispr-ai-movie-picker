export function parseGptResult(text) {
  const lines = text.split("\n").filter(Boolean);
  const results = [];

  let current = null;

  lines.forEach((line) => {
    const titleMatch = line.match(/^\d+\.\s\*\*"?(.+?)"?\*\*/);
    if (titleMatch) {
      if (current) results.push(current);
      current = { title: titleMatch[1], explanation: "" };
    } else if (current) {
      current.explanation += line.trim() + " ";
    }
  });

  if (current) results.push(current);

  return results.length ? results : null;
}
