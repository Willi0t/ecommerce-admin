import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/styles/index.module.css";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className={styles.main}>
        <div className={styles.flexJustifyCenter}>
          <button onClick={() => signIn("google")} className="signIn">
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.loginContainer}>
      <Nav />
      <div className={styles.pageContent}>
        Logged in as {session.user.email}
      </div>
    </div>
  );
}
