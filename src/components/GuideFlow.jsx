import React from "react";
import { AnimatePresence } from "framer-motion";
import IntroSpringboard from "./IntroSpringboard";
import EmotionPicker from "./EmotionPicker";
import IntensityPicker from "./IntensityPicker";
// IntentPicker is officially DEAD! Import removed.

// Match this to your App.jsx FLOW enum
const FLOW = {
  INTRO: 0,
  EMOTION: 1,
  INTENSITY: 2,
  INTENT: 3, // We leave the number here so it matches App.jsx, but we never use it
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
  
  const renderStep = () => {
    switch (flowMode) {
      case FLOW.INTRO:
        return (
          <IntroSpringboard
            key="intro" 
            onStart={() => setFlowMode(FLOW.EMOTION)}
            onPulse={onPulse}
            pulse={pulse}
          />
        );

      case FLOW.EMOTION:
        return (
          <EmotionPicker 
            key="emotion"
            emotion={emotion} 
            setEmotion={setEmotion} 
            onNext={() => setFlowMode(FLOW.INTENSITY)} 
          />
        );

      case FLOW.INTENSITY:
        return (
          <IntensityPicker 
            key="intensity"
            emotion={emotion} 
            intensity={intensity} 
            setIntensity={setIntensity} 
            // THE ROUTING FIX: Go straight to RESULTS!
            onNext={() => setFlowMode(FLOW.RESULTS)} 
          />
        );

      // We completely deleted the FLOW.INTENT case!

      case FLOW.RESULTS:
        return null;

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {renderStep()}
    </AnimatePresence>
  );
}