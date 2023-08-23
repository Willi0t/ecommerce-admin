import React, { useState } from "react";
import styles from "@/styles/newProducts.module.css";
import Layout from "@/components/layout";
import axios from "axios";

function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const createProduct = async (ev) => {
    ev.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data);
  };

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h2 className={styles.heading}>NewProduct</h2>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        ></input>
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        ></input>
        <button type="submit" className="btnPrimary">
          Save
        </button>
      </form>
    </Layout>
  );
}

export default NewProduct;
