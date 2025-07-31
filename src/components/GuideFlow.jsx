// src/components/GuidedFlow.jsx
import React from "react";
import IntroSpringboard from "./IntroSpringboard";
import EmotionPicker from "./EmotionPicker";
import IntensityPicker from "./IntensityPicker";
import IntentPicker from "./IntentPicker";

// Make sure this matches your App.jsx FLOW enum
const FLOW = {
  INTRO: 0,
  EMOTION: 1,
  INTENSITY: 2,
  INTENT: 3,
  RESULTS: 4,
};

export default function GuidedFlow({
  flowMode,
  setFlowMode,
  emotion,
  setEmotion,
  intensity,
  setIntensity,
  intent,
  setIntent,
}) {
  switch (flowMode) {
    case FLOW.INTRO:
      return <IntroSpringboard onStart={() => setFlowMode(FLOW.EMOTION)} />;

    case FLOW.EMOTION:
      return (
        <EmotionPicker
          onNext={() => {
            /* here you’d capture emotion via props in a real picker */
            setFlowMode(FLOW.INTENSITY);
          }}
        />
      );

    case FLOW.INTENSITY:
      return (
        <IntensityPicker
          onNext={() => {
            /* here you’d capture intensity via props in a real picker */
            setFlowMode(FLOW.INTENT);
          }}
        />
      );

    case FLOW.INTENT:
      return (
        <IntentPicker
          onNext={() => {
            /* capture intent */
            setFlowMode(FLOW.RESULTS);
          }}
        />
      );

    case FLOW.RESULTS:
      return null; // App.jsx will show <GPTResults> here

    default:
      return null;
  }
}
