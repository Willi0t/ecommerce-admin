import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h2 className="heading">Edit Product</h2>
      <ProductForm {...productInfo} />
    </Layout>
  );
}

export default EditProductPage;
