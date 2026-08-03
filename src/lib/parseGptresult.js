export default function parseGptResult(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const results = [];
  let current = null;

  lines.forEach((line) => {
    if (line.startsWith("**Title:**")) {
      if (current) {
        results.push(current);
      }

      const match = line.match(
        /\*\*Title:\*\*\s*(.+?)\s+\((\d{4})\)/
      );

      if (match) {
        current = {
          title: match[1].trim(),
          year: match[2].trim(),
          tone: "",
        };
      }
    } else if (line.startsWith("**Tone:**") && current) {
      current.tone = line
        .replace("**Tone:**", "")
        .trim();
    }
  });

  if (current) {
    results.push(current);
  }

  return results.length ? results : null;
}