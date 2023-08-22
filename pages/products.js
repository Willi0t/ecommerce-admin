import React from "react";
import styles from "@/styles/products.module.css";
import Layout from "@/components/layout";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Products() {
  return (
    <Layout>
      <Link href={"/products/new"}> Add new product</Link>
      <button onClick={signOut}>signout</button>
    </Layout>
  );
}

export default Products;
