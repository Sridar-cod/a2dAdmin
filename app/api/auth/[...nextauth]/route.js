import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../utils/connectMongoDB";
import User from "../../../../models/user";
// import bcrypt from "bcryptjs"; 

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { adminName, adminPassword } = credentials;
        console.log(adminName, adminPassword, "Login attempt");

        try {
          // Connect to MongoDB
          await connectMongoDB();
          console.log("MongoDB connected");

          // Find the user by adminName
          const user = await User.findOne({ adminName });
          console.log(user,"user...")
          if (!user) {
            console.log("User not found");
            return null; // Return null if user doesn't exist
          }

          // Compare the hashed password from the database with the login password
          const passwordMatch = adminPassword === user.adminPassword

          if (!passwordMatch) {
            console.log("Password does not match");
            return null; // Return null if the password doesn't match
          }

          // If the credentials are correct, return the user object
          return user;
        } catch (err) {
          console.log("Error during authorization", err);
          return null; // Return null in case of an error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure this secret is set in your .env
  pages: {
    signIn: "/", // Redirect to your login page on sign-in
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
