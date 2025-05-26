export default function buildPrompt(mood, intent, energy) {
  return `
A user just shared a few things with you:

- They’re currently feeling **${mood}**
- Their intention is to **${intent.toLowerCase()}** that feeling
- Their mental energy right now is **${energy.toLowerCase()}**

Based on that emotional state, recommend a short list of 10 films that truly meet them where they are.

Don’t just focus on genre — consider emotional tone, pacing, themes, and the kind of story that might land gently with someone in this headspace.

Avoid over-recommending overly mainstream or commonly cited films like *Her*, *Eternal Sunshine of the Spotless Mind*, or *Inside Out*. Instead, try to include underseen, underrated, foreign, or indie films that still deeply resonate.

Aim for a few surprises. Prioritize emotional fit, but include at least some lesser-known or unconventional picks. Vary the tone — not all 10 need to feel the same.

For each film, provide:
1. The title
2. A short, honest explanation of why it fits
3. A tone tag like: [Slow-burn], [Cathartic], [Feel-good], [Wild ride], [Quiet & emotional], etc.

Speak like a thoughtful friend — someone who gets how they feel and knows what stories might resonate. Be warm, intuitive, and emotionally fluent.
`.trim();
}
