import React from "react";
import { AnimatePresence } from "framer-motion";
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
  
  // We extract the switch statement into a helper function so AnimatePresence can animate it
  const renderStep = () => {
    switch (flowMode) {
      case FLOW.INTRO:
        return (
          <IntroSpringboard
            key="intro" // Keys are required for AnimatePresence to know what is changing!
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
            setEmotion={setEmotion} // <-- THIS FIXES YOUR ERROR!
            onNext={() => setFlowMode(FLOW.INTENSITY)} 
          />
        );

      case FLOW.INTENSITY:
        return (
          <IntensityPicker 
            key="intensity"
            emotion={emotion} // <-- Passes the chosen color to the giant orb
            intensity={intensity} 
            setIntensity={setIntensity} // <-- Saves your pinch gesture
            onNext={() => setFlowMode(FLOW.INTENT)} 
          />
        );

      case FLOW.INTENT:
        return (
          <IntentPicker 
            key="intent"
            intent={intent} 
            setIntent={setIntent} 
            onNext={() => setFlowMode(FLOW.RESULTS)} 
          />
        );

      case FLOW.RESULTS:
        return null;

      default:
        return null;
    }
  };

  return (
    // AnimatePresence allows components to smoothly exit before the new one enters.
    // Notice we do NOT use mode="wait" here, because for the shared "layoutId" orb morph 
    // to work, Framer Motion needs both screens to exist for a split second!
    <AnimatePresence>
      {renderStep()}
    </AnimatePresence>
  );
}