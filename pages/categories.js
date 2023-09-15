import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import styles from "@/styles/categories.module.css";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

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
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }

    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        reverseButtons: true,
        confirmButtonColor: "#c62828",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handleProperyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handleProperyValueChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h2 className="heading">Categories</h2>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form on onSubmit={saveCategory}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder={"Catagory name"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          ></input>
          <select
            value={parentCategory}
            onChange={(ev) => setParentCategory(ev.target.value)}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
          </select>
        </div>
        <div className={styles.propertiesContainer}>
          <label className={styles.block}>Properties</label>
          <button
            type="button"
            onClick={addProperty}
            className="btnPrimary"
            style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}
          >
            Add new properties
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className={styles.propertyInputContainer}>
                <input
                  value={property.name}
                  onChange={(ev) =>
                    handleProperyNameChange(index, property, ev.target.value)
                  }
                  type="text"
                  placeholder="property name (example: color)"
                  style={{ marginBottom: "0rem" }}
                />
                <input
                  value={property.values}
                  onChange={(ev) =>
                    handleProperyValueChange(index, property, ev.target.value)
                  }
                  type="text"
                  placeholder="values, comma separated"
                  style={{ marginBottom: "0rem" }}
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="btnGrayAlt"
                >
                  remove
                </button>
              </div>
            ))}
        </div>
        <div className={styles.buttonContainer}>
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null),
                  setName(""),
                  setParentCategory(""),
                  setProperties([]);
              }}
              className="btnPrimary"
              style={{ backgroundColor: "#818181" }}
            >
              Cancel
            </button>
          )}
          <button className="btnPrimary" type="submit">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="tableGlobal">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btnPrimary"
                      style={{ marginRight: "0.25rem" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btnPrimary"
                      onClick={() => deleteCategory(category)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
