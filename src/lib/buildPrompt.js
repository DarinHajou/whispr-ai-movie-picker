export default function buildPrompt(mood, intent, energy) {
  return `
A user just shared a few things with you:

- They’re currently feeling **${Array.isArray(mood) ? mood.join(", ") : mood}**
- Their intention is to **${intent.toLowerCase()}** that feeling
- Their mental energy right now is **${energy.toLowerCase()}**

Based on that emotional state, recommend a list of 10 films that truly meet them where they are.

Don’t just focus on genre — consider emotional tone, pacing, themes, and the kind of story that might land gently with someone in this head-space.

Don’t over-rely on films like *Her*, *Inside Out*, *A Ghost Story*, or *Eternal Sunshine*. You can include one if it truly fits, but not by default.

Avoid over-recommending commonly cited films like *Her*, *Inside Out*, or *Eternal Sunshine*. Favor lesser-known, or emotionally rich titles that still resonate deeply.

Aim for a few surprises. Prioritize emotional fit, but include at least some lesser-known or unconventional picks. Vary the tone — not all 10 need to feel the same.

Speak like a thoughtful friend — warm, emotionally intuitive, someone who just gets it.

✨ **For each film, return exactly this format:**

---
**Title:** Movie Title (Year)  
**Tone:** Quiet & emotional  
**IMDb Score:** 7.8  
**Plot:** A short paragraph that describes the film’s premise. Don't explain why it fits — let the story speak for itself.
---

Repeat this for all 10 films. Follow the exact format.  
No numbered list, no extra commentary. Let the list feel soft, thoughtful, and deeply curated.
`.trim();
}