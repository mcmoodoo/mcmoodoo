import { useState, type FormEvent } from "react";

type Props = {
  contactEmail?: string;
};

export default function GetInTouch({ contactEmail = "" }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    if (contactEmail) {
      const subject = encodeURIComponent("Open to work – website");
      const body = encodeURIComponent(
        `Visitor email: ${trimmedEmail}\n\nMessage:\n${message.trim() || "(none)"}`
      );
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setEmail("");
      setMessage("");
    } else {
      setSubmitted(true);
    }
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-base-content/80 whitespace-nowrap">Open to work</span>
        <div className="flex items-stretch gap-0 rounded-lg overflow-hidden border border-base-300 has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-offset-0 has-[:focus]:outline-primary">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="input input-bordered input-sm w-36 min-w-0 rounded-none border-0 border-r border-base-300 focus:outline-none focus:ring-0"
            aria-label="Your email"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="input input-bordered input-sm flex-1 min-w-[100px] rounded-none border-0 focus:outline-none focus:ring-0"
            aria-label="Message"
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm shrink-0 btn-square rounded-none"
            aria-label="Send"
            title="Send"
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
            <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
          </svg>
        </button>
        </div>
      </form>
      {submitted && !contactEmail && (
        <p className="mt-2 text-sm text-warning">
          Add your email in <code className="text-xs">src/settings.ts</code> (social.email) to receive leads.
        </p>
      )}
    </div>
  );
}
