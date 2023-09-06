import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import styles from "@/styles/categories.module.css";
import axios from "axios";

function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    await axios.post("/api/categories", { name });
    setName("");
    fetchCategories();
  }

  return (
    <Layout>
      <h2 className="heading">Categories</h2>
      <label>New category name</label>
      <form on onSubmit={saveCategory} className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder={"Catagory name"}
          onChange={(ev) => setName(ev.target.value)}
          value={name}
        ></input>
        <button className="btnPrimary" type="submit">
          Save
        </button>
      </form>
      <table className="tableGlobal">
        <thead>
          <tr>
            <td>Category name</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Categories;
