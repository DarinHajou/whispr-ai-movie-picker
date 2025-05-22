export default function buildPrompt(mood, intent, energy) {
  return `
A user just shared a few things with you:

- They’re currently feeling **${mood}**
- Their intention is to **${intent.toLowerCase()}** that feeling
- Their mental energy right now is **${energy.toLowerCase()}**

Based on that emotional state, recommend a short list of 3 films that truly meet them where they are.

Don’t just focus on genre — consider emotional tone, pacing, themes, and the kind of story that might land gently with someone in this headspace.

For each film, provide:
1. The title
2. A short, honest explanation of why it fits

Speak like a thoughtful friend — someone who gets how they feel and knows what stories might resonate. Be warm, intuitive, and emotionally fluent.
`.trim();
}