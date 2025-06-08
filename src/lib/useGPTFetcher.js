import { useState, useEffect, useRef } from "react";
import { callOpenAI } from "./callOpenAI";
import buildPrompt from "./buildPrompt";
import parseGPTResult from "./parseGptresult";

export function useGPTFetcher({ mood, intent, energy, step }) {
  const [gptResult, setGptResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const abortRef = useRef(null);
  const [parsedMovies, setParsedMovies] = useState([]);
  const hasMovies = parsedMovies?.length > 0;


  useEffect(() => {
    const fetchGPT = async () => {
      if (step !== 4) return;
      setLoading(true);
      try {
        const prompt = buildPrompt(mood, intent, energy);
        const result = await callOpenAI(prompt);
        setGptResult(result);
        const parsed = parseGPTResult(result);
        setParsedMovies(parsed || []);
        setHasFetched(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGPT();
  }, [step]);

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
            const parsed = parseGPTResult(result);
            setParsedMovies(parsed || [])
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
      reset();
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
    parsedMovies,
    hasMovies,
    loading,
    error,
    retry,
    reset,
    retryCount,
  };
}
