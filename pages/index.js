import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="main">
        <div className="flex-justify-center">
          <button onClick={() => signIn("google")} className="sign-in">
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return <div>Logged in as {session.user.email}</div>;
}
