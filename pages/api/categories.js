import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";

async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find());
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body;
    const categoryDoc = await Category.create({ name, parent: parentCategory });
    res.json(categoryDoc);
  }
}

export default handle;
