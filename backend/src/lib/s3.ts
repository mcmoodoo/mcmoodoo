import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../config";
import { randomBytes } from "crypto";

const s3Client = new S3Client({
  region: config.awsRegion,
});

export async function createPresignedUploadUrl(extension: string) {
  const safeExt = extension.replace(/[^a-zA-Z0-9]/g, "") || "webm";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const random = randomBytes(8).toString("hex");
  const key = `asr-recordings/${timestamp}-${random}.${safeExt}`;

  const command = new PutObjectCommand({
    Bucket: config.s3Bucket,
    Key: key,
    ContentType: "audio/webm",
  });

  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 15 * 60, // 15 minutes
  });

  const fileUrl = `https://${config.s3Bucket}.s3.${config.awsRegion}.amazonaws.com/${key}`;

  return { uploadUrl, fileUrl, key };
}
