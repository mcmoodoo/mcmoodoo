import { config } from "../config";

const RUNPOD_BASE = "https://api.runpod.ai/v2";

async function runpodPost<TInput, TOutput>(
  endpointId: string,
  body: TInput
): Promise<TOutput> {
  if (!config.runpodApiKey) {
    throw new Error("RUNPOD_API_KEY is not configured");
  }

  const res = await fetch(`${RUNPOD_BASE}/${endpointId}/runsync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.runpodApiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `RunPod request failed (${res.status} ${res.statusText}): ${text}`
    );
  }

  return (await res.json()) as TOutput;
}

type WhisperInput = {
  input: {
    prompt?: string;
    audio: string;
    language?: string;
  };
};

export async function callWhisper(audioUrl: string, prompt?: string, language?: string) {
  const body: WhisperInput = {
    input: {
      audio: audioUrl,
      prompt: prompt ?? "",
      language,
    },
  };

  // Matches runpod/asr-sample-call Justfile endpoint.
  return runpodPost<WhisperInput, unknown>("whisper-v3-large", body);
}

type TtsInput = {
  input: {
    prompt: string;
    voice?: string;
    format?: string;
  };
};

export async function callTts(text: string, voice = "gordon", format = "wav") {
  const body: TtsInput = {
    input: {
      prompt: text,
      voice,
      format,
    },
  };

  // Matches runpod/tts-sample-call Justfile endpoint.
  return runpodPost<TtsInput, unknown>("chatterbox-turbo", body);
}

