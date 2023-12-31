import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
const bucketName = "hyper-e-commerce-store";

async function handle(req, res) {
  await mongooseConnect();
  //added security
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) PromiseRejectionEvent(err);
      resolve({ fields, files });
    });
  });
  console.log("length", files.file.length);
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + ext;

    try {
      const fileData = fs.readFileSync(file.path);

      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFilename,
          Body: fs.readFileSync(file.path),
          ACL: "public-read",
          ContentType: mime.lookup(file.path),
        })
      );

      const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
      links.push(link);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return res.json({ links });
}

export const config = { api: { bodyParser: false } };
export default handle;
