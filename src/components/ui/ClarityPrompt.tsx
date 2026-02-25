import { useEffect, useRef, useState, type FormEvent } from "react";

const CLARITY_URL = "https://clarity.mcmoodoo.workers.dev/ask";

type Message = {
  id: number;
  question: string;
  answer?: string;
  error?: string;
};

export default function ClarityPrompt() {
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [history.length]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;

    const trimmed = question.trim();
    setQuestion(""); // clear immediately on submit

    const id = Date.now();
    setHistory((prev) => [
      ...prev,
      {
        id,
        question: trimmed,
      },
    ]);

    setLoading(true);
    try {
      const res = await fetch(CLARITY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMsg: string =
          data?.error ?? `Request failed (${res.status})`;
        setHistory((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, error: errorMsg, answer: undefined } : m,
          ),
        );
        return;
      }
      const answer =
        typeof data?.answer === "string" ? data.answer : String(data?.answer);
      setHistory((prev) =>
        prev.map((m) => (m.id === id ? { ...m, answer, error: undefined } : m)),
      );
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Something went wrong";
      setHistory((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, error: errorMsg, answer: undefined } : m,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-base-300 bg-base-200/50 p-4 sm:p-5">
      <div className="flex flex-col gap-3">

        {/* History — only show when there are messages */}
        {history.length > 0 && (
          <div
            ref={scrollRef}
            className="max-h-64 w-full overflow-y-auto rounded-lg border border-base-300 bg-base-100 p-3 text-sm sm:text-base"
          >
            <div className="flex flex-col gap-3">
              {history.map((msg) => (
                <div key={msg.id} className="flex flex-col gap-1.5">
                  <div className="flex justify-end">
                    <div className="max-w-full rounded-2xl bg-primary text-primary-content px-3 py-2 text-xs sm:text-sm">
                      {msg.question}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-full rounded-2xl bg-base-200 px-3 py-2 text-xs sm:text-sm whitespace-pre-wrap">
                    {msg.error ? (
                      <span className="text-error">{msg.error}</span>
                    ) : msg.answer ?? (
                      <span className="inline-flex gap-1" aria-hidden>
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-base-content/40 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-base-content/40 animate-bounce"
                          style={{ animationDelay: "0.15s" }}
                        />
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-base-content/40 animate-bounce"
                          style={{ animationDelay: "0.3s" }}
                        />
                      </span>
                    )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch"
        >
          <div className="flex w-full flex-1 items-stretch gap-0 overflow-hidden rounded-xl border border-base-300 has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-primary min-w-0">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about Rashid"
              className="input input-bordered w-full min-w-0 flex-1 rounded-none border-0 border-r border-base-300 text-sm focus:outline-none focus:ring-0 sm:text-base"
              disabled={loading}
              aria-label="Ask me a question"
            />
            <button
              type="submit"
              className="btn btn-primary text-primary-content min-w-12 shrink-0 rounded-none px-4"
              disabled={loading || !question.trim()}
              aria-label="Send"
              title="Send"
            >
              {loading ? (
                "…"
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-6" aria-hidden>
                  <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
