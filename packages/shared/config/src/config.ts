import dotenv from "dotenv";
import path from "node:path"

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

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
  }
}

export const config = new Config();
