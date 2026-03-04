import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3000,
  runpodApiKey: process.env.RUNPOD_API_KEY ?? "",
  awsRegion: process.env.AWS_REGION ?? "us-east-1",
  s3Bucket: process.env.S3_BUCKET ?? "mcmoodoo",
  frontendOrigin: process.env.FRONTEND_ORIGIN,
};

if (!config.runpodApiKey) {
  // In dev this will help catch misconfiguration early.
  // In prod (Railway) you should set RUNPOD_API_KEY.
  console.warn("[config] RUNPOD_API_KEY is not set");
}
