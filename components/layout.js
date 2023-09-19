import Nav from "@/components/Nav";
import styles from "@/styles/layout.module.css";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav((prevShowNav) => !prevShowNav);
  };

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
    <div className={styles.wrapper}>
      <div className={styles.mobileItems}>
        <button onClick={toggleNav} className={styles.hamburger}>
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className={styles.logoCenter}>
          <Link href={"/"} className={styles.linkProps}>
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
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
            <span>Ecommerce admin</span>
          </Link>
        </div>
      </div>
      <div className={styles.pageContentContainer}>
        <Nav show={showNav} />
        <div className={styles.pageContent}>{children}</div>
      </div>
    </div>
  );
}
