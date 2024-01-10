"use server";
import { revalidatePath } from "next/cache";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const com = new GetObjectCommand({
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
  });
  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    const url = await getSignedUrl(s3Client, com, { expiresIn: 900 });
    console.log("file upload url ", url);
    const fileUrl = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    console.log("File uploaded successfully:", response, fileUrl);
    return fileUrl;
  } catch (error) {
    throw error;
  }
}

export async function uploadFile(prevState, formData) {
  try {
    const file = formData.get("file");

    if (file.size === 0) {
      return { status: "error", message: "Please select a file." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const res = await uploadFileToS3(buffer, file.name);
    console.log(res);

    revalidatePath("/");
    return { status: "success", message: "File has been upload." };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Failed to upload file." };
  }
}
