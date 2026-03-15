import { defineConfig} from "prisma/config";
import { config } from "@project/config";

if (!config.database.url) {
  throw new Error("DATABASE_URL is not set in config");
}

export default defineConfig({
  schema: "../prisma/schema.prisma",
  migrations: {
    path: "../prisma/migrations",
  },
  datasource: {
    url: config.database.url,
  },
});
