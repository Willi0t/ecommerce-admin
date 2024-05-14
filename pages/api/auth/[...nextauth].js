import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

//adding Admin Email
const adminEmails = ["william.sinclair92@gmail.com"];

export const authOptions = {
    providers: [
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET, // Add this line
    callbacks: {
        session: ({ session, token, user }) => {
            if (adminEmails.includes(session?.user?.email)) {
                session.user.isAdmin = true; // Better to add an isAdmin flag
                return session;
            } else {
                return null; // Return null to invalidate the session if not admin
            }
        },
    },
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
