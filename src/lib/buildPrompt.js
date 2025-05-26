export default function buildPrompt(mood, intent, energy) {
  return `
A user just shared a few things with you:

- They’re currently feeling **${mood}**
- Their intention is to **${intent.toLowerCase()}** that feeling
- Their mental energy right now is **${energy.toLowerCase()}**

Based on that emotional state, recommend a list of 10 films that truly meet them where they are.

Don’t just focus on genre — consider emotional tone, pacing, themes, and the kind of story that might land gently with someone in this headspace.

Avoid over-recommending commonly cited films like *Her*, *Inside Out*, or *Eternal Sunshine*. Favor lesser-known, foreign, or emotionally rich titles that still resonate deeply.

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
