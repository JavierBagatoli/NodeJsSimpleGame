import { dataFakeItemBase } from "../../fakeData/fakeBiblioteca.data";
import { dataFakePlayers } from "../../fakeData/fakeData.data";
import { findPlayer } from "../../globals/player.aux";

export async function getPlayer(userId: number) {
  const player = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if (!player) {
    throw new Error("Jugador no encontrado");
  }

   return player;
}

export async function getPlayerStats(userId: number) {
  const player = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if (!player) {
    throw new Error("Jugador no encontrado");
  }

   return player.stats;
}