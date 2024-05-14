import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "@/styles/productForm.module.css";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
    properties: assignedProperties,
}) {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [category, setCategory] = useState(assignedCategory || "");
    const [productProperties, setProductProperties] = useState(
        assignedProperties || {}
    );
    const [price, setPrice] = useState(existingPrice || "");
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    useEffect(() => {
        axios.get("/api/categories").then((result) => {
            setCategories(result.data);
        });
    }, []);
    async function saveProduct(ev) {
        ev.preventDefault();
        const data = {
            title,
            description,
            price,
            images,
            category,
            properties: productProperties,
        };
        if (_id) {
            //update
            await axios.put("/api/products", { ...data, _id });
        } else {
            //create
            await axios.post("/api/products", data);
        }
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push("/products");
    }
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            const res = await axios.post("/api/upload", data);
            setImages((oldImages) => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    function updateImagesOrder(images) {
        setImages(images);
    }
    function setProductProp(propName, value) {
        setProductProperties((prev) => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        propertiesToFill.push(...catInfo.properties);
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(
                ({ _id }) => _id === catInfo?.parent?._id
            );
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input
                type="text"
                placeholder="product name"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            ></input>
            <label>Category</label>
            <select
                value={category}
                onChange={(ev) => setCategory(ev.target.value)}
            >
                <option value="">Uncategorized</option>
                {categories.length > 0 &&
                    categories.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
            </select>
            {propertiesToFill.length > 0 &&
                propertiesToFill.map((p) => (
                    <div key={p.name} className="">
                        <label>
                            {p.name[0].toUpperCase() + p.name.substring(1)}
                        </label>
                        <div>
                            <select
                                value={productProperties[p.name]}
                                onChange={(ev) =>
                                    setProductProp(p.name, ev.target.value)
                                }
                            >
                                {p.values.map((v) => (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            <label>Images</label>
            <div className={styles.imagesContainer}>
                <ReactSortable
                    className={styles.imageSortContainer}
                    list={images}
                    setList={updateImagesOrder}
                >
                    {!!images?.length &&
                        images.map((link) => (
                            <div
                                className={styles.imgIndividualContainer}
                                key={link}
                            >
                                <img src={link} />
                            </div>
                        ))}
                </ReactSortable>
                {isUploading && (
                    <div className={styles.spinner}>
                        <Spinner />
                    </div>
                )}
                <label className={styles.imgButton}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                    </svg>
                    <div className={styles.textContainer}>Uppload</div>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={uploadImages}
                    ></input>
                </label>
            </div>
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
    );
}

export default ProductForm;
