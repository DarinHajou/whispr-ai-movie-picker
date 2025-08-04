import FadeOnly from "./FadeOnly";
import React from "react";
import IntroSpringboard from "./IntroSpringboard";
import EmotionPicker from "./EmotionPicker";
import IntensityPicker from "./IntensityPicker";
import IntentPicker from "./IntentPicker";

// Match this to your App.jsx FLOW enum
const FLOW = {
  INTRO: 0,
  EMOTION: 1,
  INTENSITY: 2,
  INTENT: 3,
  RESULTS: 4,
};

export default function GuideFlow({
  flowMode,
  setFlowMode,
  emotion,
  setEmotion,
  intensity,
  setIntensity,
  intent,
  setIntent,
  pulse,
  onPulse
}) {
  switch (flowMode) {
    case FLOW.INTRO:
      return (
        <IntroSpringboard
          onStart={() => setFlowMode(FLOW.EMOTION)}
          onPulse={onPulse}
          pulse={pulse}
        />
      );

    case FLOW.EMOTION:
      return <EmotionPicker onNext={() => setFlowMode(FLOW.INTENSITY)} />;

    case FLOW.INTENSITY:
      return <IntensityPicker onNext={() => setFlowMode(FLOW.INTENT)} />;

    case FLOW.INTENT:
      return <IntentPicker onNext={() => setFlowMode(FLOW.RESULTS)} />;

    case FLOW.RESULTS:
      return null;

    default:
      return null;
  }
}
