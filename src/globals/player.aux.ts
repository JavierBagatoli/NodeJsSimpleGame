import { json } from "express";
import { dataFakePlayers } from "../fakeData/fakeData.data";
import { Player } from "../modules/player/player.interfaces";

export function findPlayer(userId: number): Player | null{
  const player = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if (!player) {
    return null
  }

  return player
}