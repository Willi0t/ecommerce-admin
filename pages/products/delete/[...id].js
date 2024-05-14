import React, { useEffect, useState } from "react";
import styles from "@/styles/deleteProducts.module.css";
import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";

//changed deleteProducts name form D to d

function DeleteProductPage() {
    const [productInfo, setProductInfo] = useState();
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
    function goBack() {
        router.push("/products");
    }
    async function deleteProduct() {
        await axios.delete("/api/products?id=" + id);
        goBack();
    }
    return (
        <Layout>
            <h2 className={styles.deleteheading}>
                Do you really want to delete product&nbsp;&quot;
                {productInfo?.title}&quot;?
            </h2>
            <div className={styles.buttonContainer}>
                <button className="btnRed" onClick={deleteProduct}>
                    Yes
                </button>
                <button className="btnGray" onClick={goBack}>
                    No
                </button>
            </div>
        </Layout>
    );
}

export default DeleteProductPage;
