import { useState, useEffect, useRef } from "react";
import { callOpenAI } from "./lib/callOpenAI";
import buildPrompt from "./lib/buildPrompt";

export function useGPTFetcher({ mood, intent, energy, step }) {
  const [gptResult, setGptResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const abortRef = useRef(null);

  useEffect(() => {
    let controller = null;
    let cancelled = false;

    if (step === 4 && mood && intent && energy && !hasFetched) {
      controller = new AbortController();
      abortRef.current = controller;

      const run = async () => {
        const prompt = buildPrompt(mood, intent, energy);
        if (!prompt) {
          setError("Prompt invalid. Please go back and re-select options.");
          return;
        }

        setLoading(true);
        setError("");

        try {
          const result = await callOpenAI(prompt, { signal: controller.signal });
          if (!cancelled) {
            setGptResult(result);
          }
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          if (!cancelled) {
            setHasFetched(true);
            setLoading(false);
          }
        }
      };

      run();
    }

    return () => {
      cancelled = true;
      if (controller) controller.abort();
    };
  }, [step, mood, intent, energy, hasFetched]);

  function retry() {
    if (retryCount < 2) {
      setRetryCount((r) => r + 1);
      setGptResult("");
      setHasFetched(false);
    }
  }

  function reset() {
    setGptResult("");
    setError("");
    setHasFetched(false);
    setRetryCount(0);
  }

  return {
    gptResult,
    loading,
    error,
    retry,
    reset,
  };
}
