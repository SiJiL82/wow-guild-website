import { config } from "@project/config";
import { createBlizzardApiClient } from '@blizzard-api/client';
import { getBlizzardApi, type Origins } from '@blizzard-api/core';

type BlizzardApiClient = Awaited<ReturnType<typeof createBlizzardApiClient>>;

const { origin, hostname, locale } = getBlizzardApi(config.battlenet.region as Origins);

let client: BlizzardApiClient | null = null;

export async function getClient(): Promise<BlizzardApiClient> {
  if (!client) {
    client = await createBlizzardApiClient({
      key: config.battlenet.clientId,
      secret: config.battlenet.clientSecret,
      origin
    });
  }

  return client;
}
