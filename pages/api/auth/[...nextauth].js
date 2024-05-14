import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

//adding Admin Email
const adminEmails = ["william.sinclair92@gmail.com"];

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token, user }) => {
            session.user.isAdmin = adminEmails.includes(session?.user?.email); // Simplified admin check
            return session.user.isAdmin ? session : null;
        },
    },
    // Add the NEXTAUTH_URL here
    site: process.env.NEXTAUTH_URL, // This sets the base URL for callback URLs and other internal processes
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (!adminEmails.includes(session?.user?.email)) {
        res.status(401);
        res.end();
        throw "not an admin";
    }
}
