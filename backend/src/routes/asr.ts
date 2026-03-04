import { Router, Request, Response } from "express";
import { callWhisper } from "../lib/runpod";

export const asrRouter = Router();

asrRouter.post("/from-url", async (req: Request, res: Response) => {
  try {
    const { audioUrl, prompt, language } = req.body as {
      audioUrl?: string;
      prompt?: string;
      language?: string;
    };

    if (!audioUrl || typeof audioUrl !== "string") {
      return res.status(400).json({
        success: false,
        error: "audioUrl is required",
      });
    }

    const raw = await callWhisper(audioUrl, prompt, language);

    // We don't know the exact shape of RunPod's output, so we just pass it through
    // and attempt to pick common fields when present.
    const anyRaw = raw as any;
    const text =
      anyRaw?.output?.text ??
      anyRaw?.output?.transcription ??
      anyRaw?.output?.result ??
      null;

    const segments = anyRaw?.output?.segments ?? null;

    res.json({
      success: true,
      text,
      segments,
      raw,
    });
  } catch (err) {
    console.error("[asr.from-url] error", err);
    res.status(502).json({
      success: false,
      error: "Failed to transcribe audio",
    });
  }
});

