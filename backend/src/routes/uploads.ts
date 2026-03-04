import { Router, Request, Response } from "express";
import { createPresignedUploadUrl } from "../lib/s3";

export const uploadsRouter = Router();

uploadsRouter.post("/presign", async (req: Request, res: Response) => {
  try {
    const { extension } = req.body as { extension?: string };
    const ext = extension && typeof extension === "string" ? extension : "webm";

    const { uploadUrl, fileUrl, key } = await createPresignedUploadUrl(ext);

    res.json({
      success: true,
      uploadUrl,
      fileUrl,
      key,
    });
  } catch (err) {
    console.error("[uploads.presign] error", err);
    res.status(500).json({
      success: false,
      error: "Failed to create upload URL",
    });
  }
});

