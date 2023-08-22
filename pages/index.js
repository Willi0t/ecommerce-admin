import React from "react";
import styles from "@/styles/index.module.css";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className={styles.userContent}>
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className={styles.userImage}>
          <img
            src={session?.user?.image}
            alt="current user profile picture"
          ></img>
          <span>{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
