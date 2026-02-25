import { useState, type FormEvent } from "react";

const FORMSPREE_URL = "https://formspree.io/f/xwvnagpy";

export default function GetInTouch() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, message: message.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-base-content/80 whitespace-nowrap animate-pulse [animation-duration:2.5s]">Open to work</span>
        <div className="flex items-stretch gap-0 rounded-lg overflow-hidden border border-base-300 has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-primary flex-1 min-w-0">
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="input input-bordered input-sm w-36 min-w-0 rounded-none border-0 border-r border-base-300 focus:outline-none focus:ring-0"
              aria-label="Your email"
              disabled={status === "sending"}
            />
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="input input-bordered input-sm flex-1 min-w-[100px] rounded-none border-0 focus:outline-none focus:ring-0"
              aria-label="Message"
              disabled={status === "sending"}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm shrink-0 btn-square rounded-none"
              aria-label="Send"
              title="Send"
              disabled={status === "sending"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
                <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
              </svg>
            </button>
        </div>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-success">Sent. I&apos;ll be in touch.</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-error">Something went wrong. Try again?</p>
      )}
    </div>
  );
}
