import React from "react";
import styles from "@/styles/newProducts.module.css";
import Layout from "@/components/layout";

function NewProduct() {
  return (
    <Layout>
      <h2 className={styles.heading}>NewProduct</h2>
      <label>Product name</label>
      <input type="text" placeholder="product name"></input>
      <label>Description</label>
      <textarea placeholder="description"></textarea>
      <label>Price (in USD)</label>
      <input type="number" placeholder="price"></input>
      <button className="btnPrimary">Save</button>
    </Layout>
  );
}

export default NewProduct;
