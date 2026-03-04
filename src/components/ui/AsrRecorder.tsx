import { useRef, useState } from "react";

const BACKEND_URL =
  (import.meta as any).env?.PUBLIC_BACKEND_URL ?? "http://localhost:3000";

type Status =
  | "idle"
  | "recording"
  | "uploading"
  | "transcribing"
  | "error"
  | "done";

export default function AsrRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [ttsUrl, setTtsUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function startRecording() {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Your browser does not support audio recording.");
        setStatus("error");
        return;
      }

      setError(null);
      setTranscript(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];
        stream.getTracks().forEach((track) => track.stop());
        await uploadAndTranscribe(blob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setStatus("recording");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to start recording.";
      setError(message);
      setStatus("error");
    }
  }

  function stopRecording() {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === "recording") {
      recorder.stop();
      setStatus("uploading");
    }
  }

  async function uploadAndTranscribe(blob: Blob) {
    try {
      setStatus("uploading");

      // 1) Ask backend for presigned URL
      const presignRes = await fetch(`${BACKEND_URL}/uploads/presign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extension: "webm" }),
      });

      if (!presignRes.ok) {
        const text = await presignRes.text();
        throw new Error(
          `Failed to get upload URL (${presignRes.status}): ${text}`,
        );
      }

      const { uploadUrl, fileUrl } = (await presignRes.json()) as {
        uploadUrl: string;
        fileUrl: string;
      };

      // 2) Upload the blob directly to S3
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        body: blob,
        headers: {
          "Content-Type": "audio/webm",
        },
      });

      if (!putRes.ok) {
        const text = await putRes.text();
        throw new Error(
          `Upload to S3 failed (${putRes.status}): ${text || "unknown error"}`,
        );
      }

      // 3) Call ASR endpoint
      setStatus("transcribing");

      const asrRes = await fetch(`${BACKEND_URL}/asr/from-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audioUrl: fileUrl }),
      });

      const data = await asrRes.json();

      if (!asrRes.ok || !data.success) {
        const message =
          (data && data.error) ||
          `ASR request failed (${asrRes.status})` ||
          "Unknown ASR error";
        throw new Error(message);
      }

      const finalText =
        typeof data.text === "string"
          ? data.text
          : data.raw?.output?.text ?? "[No text in response]";

      setTranscript(finalText);
      setTtsUrl(null);
      setStatus("done");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setStatus("error");
    }
  }

  async function handleSpeak() {
    if (!transcript) return;
    try {
      setError(null);
      const res = await fetch(`${BACKEND_URL}/tts/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: transcript,
          voice: "gordon",
          format: "wav",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        const message =
          (data && data.error) ||
          `TTS request failed (${res.status})` ||
          "Unknown TTS error";
        throw new Error(message);
      }

      const url: string | undefined =
        data.output?.audio_url ?? data.output?.result;
      if (!url) {
        throw new Error("No audio URL in TTS response.");
      }

      setTtsUrl(url);

      // Play immediately if possible
      const el = audioRef.current;
      if (el) {
        el.src = url;
        await el.play().catch(() => {
          // Ignore autoplay failures; user can press play manually.
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate speech.";
      setError(message);
    }
  }

  const isRecording = status === "recording";
  const isBusy =
    status === "recording" ||
    status === "uploading" ||
    status === "transcribing";

  const statusLabel =
    status === "idle"
      ? "Ready"
      : status === "recording"
        ? "Recording…"
        : status === "uploading"
          ? "Uploading…"
          : status === "transcribing"
            ? "Transcribing…"
            : status === "done"
              ? "Done"
              : "Error";

  return (
    <div className="mt-6 rounded-xl border border-base-300 bg-base-200/50 p-4 sm:p-5">
      <h2 className="mb-3 text-base font-semibold sm:text-lg">
        Quick ASR test
      </h2>

      <p className="mb-4 text-sm text-base-content/70">
        Record a short clip, upload it to S3, and send it to your RunPod
        Whisper backend. This is a single-shot “record then transcribe” flow.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          className={`btn ${
            isRecording ? "btn-error" : "btn-primary"
          } text-primary-content w-full sm:w-auto`}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={status === "uploading" || status === "transcribing"}
        >
          {isRecording ? "Stop recording" : "Start recording"}
        </button>

        <div className="text-sm text-base-content/80">
          <span className="font-medium">Status:</span> {statusLabel}
          {error && (
            <span className="ml-2 text-error">
              – {error.length > 140 ? `${error.slice(0, 140)}…` : error}
            </span>
          )}
        </div>
      </div>

      {transcript && (
        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium">
            Transcript
          </label>
          <textarea
            className="textarea textarea-bordered w-full min-h-[120px] text-sm sm:text-base"
            readOnly
            value={transcript}
          />
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={handleSpeak}
              disabled={!transcript}
            >
              Speak transcript
            </button>
            {ttsUrl && (
              <audio
                ref={audioRef}
                controls
                src={ttsUrl}
                className="h-8"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

