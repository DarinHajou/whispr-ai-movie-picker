const CRAVING_GUIDES = {
  comfort:
    "Warmth, reassurance, emotional safety, tenderness, or the feeling of being held by the story.",

  escape:
    "A sense of leaving ordinary life behind through atmosphere, adventure, immersion, another world, or a strong change of perspective.",

  thrill:
    "Tension, momentum, anticipation, danger, excitement, or the feeling of being alert and fully engaged.",

  longing:
    "Yearning, intimacy, nostalgia, distance, missed connection, romantic ache, or reaching for something just out of grasp.",

  release:
    "Catharsis, emotional confrontation, grief, pressure breaking, transformation, or finally letting something move through you.",

  wonder:
    "Awe, curiosity, imagination, beauty, discovery, mystery, scale, or the feeling that the world is larger than expected.",
};

const INTENSITY_GUIDES = {
  "soft & gentle":
    "Deliver the craving lightly. Favor restraint, breathing room, approachable pacing, and emotional subtlety. Avoid overwhelming tension, cruelty, or emotional exhaustion.",

  balanced:
    "Deliver the craving clearly without making the experience either too mild or relentless. Balance accessibility with emotional depth.",

  "deep & intense":
    "Fully immerse the viewer in the craving. Strong emotional weight, sustained atmosphere, difficult themes, or heightened tension are welcome when they genuinely fit.",
};

function normalizeSelection(value) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value && typeof value === "object") {
    return value.label || value.id || "";
  }

  return "";
}

export default function buildPrompt(mood, energy, refinement = "") {
  const craving = normalizeSelection(mood);
  const intensity = normalizeSelection(energy);
  const refinementText = normalizeSelection(refinement);

  if (!craving || !intensity) {
    throw new Error("Craving and intensity are required.");
  }

  const cravingKey = craving.toLowerCase();
  const intensityKey = intensity.toLowerCase();

  const cravingMeaning =
    CRAVING_GUIDES[cravingKey] ||
    `A cinematic experience centered around ${craving}.`;

  const intensityMeaning =
    INTENSITY_GUIDES[intensityKey] ||
    `Deliver the experience at a ${intensity} level.`;

    const refinementDirection = refinementText
      ? `
    The user wants the next set adjusted in this direction:

    **${refinementText}**

    Apply this direction while preserving the original craving and intensity.
    `
  : "";

  return `
    You are curating films for Whisper, an emotion-led movie recommendation experience.

    The user is not necessarily describing how they currently feel.
    They are choosing the emotional experience they want a film to create.

    Their cinematic craving is: **${craving}**

    Within Whisper, this means:
    ${cravingMeaning}

    Their preferred intensity is: **${intensity}**

    Within Whisper, this means:
    ${intensityMeaning}

    ${refinementDirection}

    Recommend exactly 6 real feature films that combine this craving and intensity.

    Selection principles:

    - Emotional fit is more important than genre.
    - Interpret the craving and intensity together, not as separate filters.
    - Consider pacing, atmosphere, emotional weight, themes, tension, visual style, and the overall experience of watching the film.
    - Avoid defaulting to the same widely repeated mood-based recommendations.
    - Include a thoughtful mix of recognizable films and less-obvious discoveries.
    - Include at least three picks that feel unexpected but still clearly fit.
    - Do not fill the list with films that have nearly identical tones, premises, or genres.
    - Do not recommend multiple films from the same franchise.
    - Do not force variety when it weakens the emotional match.
    - Recommend films that genuinely exist. Do not invent titles, years, plots, or ratings.
    - Keep plot descriptions concise and free of major spoilers.
    - Place the strongest overall match first. The remaining five should offer distinct interpretations of the same craving and intensity.

    Return every film using exactly this format:

    ---
    **Title:** Movie Title (Year)
    **Tone:** A short description of the viewing experience
    **IMDb Score:** 7.8
    **Plot:** A concise paragraph describing the film’s premise without explaining why it was selected.
    ---

    Repeat this format for all 6 films.

    Do not number the films.
    Do not include an introduction, conclusion, explanation, or commentary outside the film entries.
    `.trim();
    }