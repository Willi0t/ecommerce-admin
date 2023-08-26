import Nav from "@/components/Nav";
import styles from "@/styles/layout.module.css";
import { useSession, signIn } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.flexJustifyCenter}>
          <button onClick={() => signIn("google")} className={styles.signIn}>
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.pageContentContainer}>
      <Nav />
      <div className={styles.pageContent}>{children}</div>
    </div>
  );
}
