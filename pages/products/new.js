import React from "react";
import Layout from "@/components/layout";
import ProductForm from "@/components/ProductForm";

function NewProduct() {
  return (
    <Layout>
      <h2 className="heading">NewProduct</h2>
      <ProductForm />
    </Layout>
  );
}

export default NewProduct;
