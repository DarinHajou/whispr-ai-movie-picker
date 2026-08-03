import { useEffect, useRef, useState } from "react";
import callSolChat from "../lib/callSolChat";

function normalizeLabel(value) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value && typeof value === "object") {
    return value.label || value.id || "";
  }

  return "";
}

export default function SolChat({
  craving,
  intensity,
  recommendations,
  onClose,
}) {
  const cravingLabel = normalizeLabel(craving);
  const intensityLabel = normalizeLabel(intensity);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `You’re craving ${cravingLabel} at a ${intensityLabel} intensity. I chose these films around that experience. What would you like to narrow down, compare, or understand better?`,
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) {
      return;
    }

    const userMessage = {
      role: "user",
      content: trimmedInput,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const reply = await callSolChat({
        craving: cravingLabel,
        intensity: intensityLabel,
        recommendations,
        messages: nextMessages,
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (requestError) {
      console.error("Sol chat failed:", requestError);

      setError(
        requestError.message || "Sol could not respond right now."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-[#FFC542]/25 bg-gray-900/90 shadow-xl">
      <div className="flex items-start justify-between border-b border-white/10 px-4 py-4 sm:px-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#FFC542]">
            Ask Sol
          </p>

          <p className="mt-1 text-sm text-warm-white/70">
            Continue with your current craving and recommendations.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm text-warm-white/60 transition hover:bg-white/10 hover:text-warm-white"
            aria-label="Close Ask Sol"
          >
            Close
          </button>
        )}
      </div>

      <div className="max-h-[420px] space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
        {messages.map((message, index) => {
          const isSol = message.role === "assistant";

          return (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${
                isSol ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={
                  isSol
                    ? "max-w-[88%] rounded-2xl rounded-tl-sm border border-[#FFC542]/20 bg-[#FFC542]/10 px-4 py-3 text-sm leading-relaxed text-warm-white"
                    : "max-w-[88%] rounded-2xl rounded-tr-sm bg-gray-700 px-4 py-3 text-sm leading-relaxed text-warm-white"
                }
              >
                {isSol && (
                  <span className="mb-1 block text-xs font-medium text-[#FFC542]">
                    Sol
                  </span>
                )}

                <p className="whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm border border-[#FFC542]/20 bg-[#FFC542]/10 px-4 py-3 text-sm text-warm-white/60">
              Sol is thinking…
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 p-4 sm:p-5"
      >
        {error && (
          <p className="mb-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="flex items-end gap-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
            rows={2}
            placeholder="Ask which film fits best, compare two picks, or request something more specific…"
            className="min-h-[52px] flex-1 resize-none rounded-xl border border-white/10 bg-gray-800 px-4 py-3 text-sm text-warm-white outline-none transition placeholder:text-gray-500 focus:border-[#FFC542]/50"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="rounded-xl border border-[#FFC542]/40 px-5 py-3 text-sm font-medium text-[#FFC542] transition hover:bg-[#FFC542]/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
}