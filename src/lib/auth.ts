
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri =
  process.env.MONGODB_URI ||
  process.env.BETTER_AUTH_DB_URL;

const databaseName =
  process.env.MONGODB_DATABASE || "bazar-dor-db";

let client: MongoClient | null = null;

function createAuth() {
  if (!uri) {
    throw new Error(
      "MongoDB is not configured. Add MONGODB_URI to your environment variables."
    );
  }

  if (!client) {
    client = new MongoClient(uri);
  }

  const db = client.db(databaseName);

  return betterAuth({
    database: mongodbAdapter(db, { client: client! }),

    emailAndPassword: {
      enabled: true,
    },

    secret: process.env.BETTER_AUTH_SECRET,

    baseURL:
      process.env.BETTER_AUTH_URL ||
      "http://localhost:3000",

    socialProviders: {
      ...(process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET
        ? {
            google: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
          }
        : {}),

      ...(process.env.GITHUB_CLIENT_ID &&
      process.env.GITHUB_CLIENT_SECRET
        ? {
            github: {
              clientId: process.env.GITHUB_CLIENT_ID,
              clientSecret: process.env.GITHUB_CLIENT_SECRET,
            },
          }
        : {}),
    },
  });
}

export const auth = createAuth();