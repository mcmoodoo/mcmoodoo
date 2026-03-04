import { Router, Request, Response } from "express";
import { callTts } from "../lib/runpod";

export const ttsRouter = Router();

ttsRouter.post("/speak", async (req: Request, res: Response) => {
  try {
    const { text, voice, format } = req.body as {
      text?: string;
      voice?: string;
      format?: string;
    };

    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        error: "text is required",
      });
    }

    const raw = await callTts(text, voice, format);
    const anyRaw = raw as any;
    const output = anyRaw?.output ?? raw;

    res.json({
      success: true,
      output,
      raw,
    });
  } catch (err) {
    console.error("[tts.speak] error", err);
    res.status(502).json({
      success: false,
      error: "Failed to generate speech",
    });
  }
});

