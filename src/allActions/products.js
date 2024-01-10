"use server";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import os from "os";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET,
});

export async function savePhotoLocal(formData) {
  const uploadPromises = formData.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];
      const tempdir = os.tmpdir();

      const uploadDir = path.join(tempdir, `/${name}.${ext}`);
      fs.writeFile(uploadDir, buffer);
      return { filepath: uploadDir, filename: file.name };
    })
  );

  return await Promise.all(uploadPromises);
}
export const uploadImagesToCloudinary = async (images) => {
  const uploadPromises = images.map(async (image) => {
    const buffer = await fs.readFile(image.filepath);
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "img",
        },
        (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(bytes);
    });
  });

  return Promise.all(uploadPromises);
};

export const CreateProducts = async (formData) => {
  try {
    const images = formData.getAll("images");

    const newfiles = await savePhotoLocal(images);
    console.log(newfiles);
    const photos = await uploadImagesToCloudinary(newfiles);
    console.log(photos);
  } catch (error) {
    console.log(error);
  }
};
