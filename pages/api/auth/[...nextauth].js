import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from '../../../db'

export const authOption = {
    providers: [
        CredentialsProvider({
          name: "Credentials",
        
          credentials: {
            username: { label: "Username", type: "text", placeholder: "eg. john" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
             try {
                const user = await db.user.findUnique({
                    where: {
                        userName: credentials.username
                    }
                });
                if( user && user.password === credentials.password) {
                    return user
                }
                return null
             } catch (error) {
                console.error(error)
             }
          }
        })
    ],
    callbacks: {
      async jwt({ token, account, profile, user }) {
        return {
          ...token,
          ...user
        }
      },
      async session({ session, token }) {
        session.user.id = token.id
        
        return session
      }
    }
    }

export default NextAuth(authOption)