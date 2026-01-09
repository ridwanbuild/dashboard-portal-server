import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "EMPLOYEE",
      },
    },
  },




  trustedOrigins: [process.env.APP_AUTH_URL || "http://localhost:3000"],

  plugins: [admin()],



  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const userData = user as any;
          const rawRole = (userData.role as string) || "";

          return {
            data: {
              ...user,
              role:
                rawRole.toUpperCase() === "USER" || !rawRole
                  ? "EMPLOYEE"
                  : rawRole.toUpperCase(),
            },
          };
        },
      },
    },
  },



});
