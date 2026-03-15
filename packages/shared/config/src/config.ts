import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

let dir = process.cwd();
  while (!fs.existsSync(path.join(dir, ".env"))) {
    const parent = path.dirname(dir);
    if (parent === dir) break; // reached root
    dir = parent;
  }
dotenv.config({ path: path.join(dir, ".env") });

export class Config {
  requireEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
      throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
  }

  readonly database = {
    url: this.requireEnv("DATABASE_URL"),
  }

  readonly battlenet = {
    clientId: this.requireEnv("BATTLENET_API_CLIENT_ID"),
    clientSecret: this.requireEnv("BATTLENET_API_CLIENT_SECRET"),
    region: this.requireEnv("BATTLENET_API_REGION"),
  }

  readonly guild = {
    realm: this.requireEnv("GUILD_REALM"),
    name: this.requireEnv("GUILD_NAME"),
  }
}

export const config = new Config();
