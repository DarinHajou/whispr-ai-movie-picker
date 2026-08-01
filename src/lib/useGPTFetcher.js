import { useEffect, useRef, useState } from "react";
import { callOpenAI } from "./callOpenAI";
import buildPrompt from "./buildPrompt";
import parseGPTResult from "./parseGptresult";

export function useGPTFetcher({ mood, energy, step }) {
  const [gptResult, setGptResult] = useState("");
  const [parsedMovies, setParsedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [refinement, setRefinement] = useState("");

  const abortRef = useRef(null);

  const hasMovies = parsedMovies.length > 0;

  useEffect(() => {
    if (step !== 4 || !mood || !energy || hasFetched) {
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    let cancelled = false;

    async function fetchRecommendations() {
      setLoading(true);
      setError("");

      try {
        const prompt = buildPrompt(mood, energy, refinement);

        const result = await callOpenAI(prompt, {
          signal: controller.signal,
        });

        if (cancelled) return;

        setGptResult(result);

        const parsed = parseGPTResult(result);
        setParsedMovies(parsed || []);
        setHasFetched(true);
      } catch (err) {
        if (err.name !== "AbortError" && !cancelled) {
          setError(err.message);
          setHasFetched(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRecommendations();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [step, mood, energy, refinement, hasFetched]);

  function retry() {
    if (retryCount >= 2) return;

    setRetryCount((count) => count + 1);
    setGptResult("");
    setParsedMovies([]);
    setError("");
    setHasFetched(false);
  }

  function refine(direction) {
    if (!direction) return;

    setRefinement(direction);
    setGptResult("");
    setParsedMovies([]);
    setError("");
    setHasFetched(false);
    setRetryCount(0);
  }

  function reset() {
    abortRef.current?.abort();

    setGptResult("");
    setParsedMovies([]);
    setError("");
    setHasFetched(false);
    setRetryCount(0);
    setLoading(false);
    setRefinement("");
  }

  return {
    gptResult,
    parsedMovies,
    hasMovies,
    loading,
    error,
    retry,
    refine,
    reset,
    retryCount,
  };
}