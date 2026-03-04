import express from "express";
import cors from "cors";
import { config } from "./config";
import { uploadsRouter } from "./routes/uploads";
import { asrRouter } from "./routes/asr";
import { ttsRouter } from "./routes/tts";

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (!config.frontendOrigin) {
      // Allow all origins if not explicitly configured (dev mode).
      return callback(null, true);
    }

    if (origin === config.frontendOrigin) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: false,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/healthz", (_req, res) => {
  res.json({ ok: true });
});

app.use("/uploads", uploadsRouter);
app.use("/asr", asrRouter);
app.use("/tts", ttsRouter);

app.listen(config.port, () => {
  console.log(`Backend listening on port ${config.port}`);
});

