// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";

// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' })
//   }

async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  mongoose.Promise = clientPromise;
  if (method === "POST") {
    const { title, description, price } = req.body;
    const productDoc = await Product.create({ title, description, price });
    res.json(productDoc);
  }
}

export default handler;
