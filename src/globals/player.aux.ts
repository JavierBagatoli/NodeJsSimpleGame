import { dataFakePlayers } from "../fakeData/fakeData.data";
import { Player } from "../modules/player/player.interfaces";
import { ErrorFindData } from "./error.interface";
import { i18n } from "../i18n/traslateMain.traslate";
import { CapitalShip } from "../modules/capitalShip/capitalShip.interfaces";
import { dataFakeCapitalShips } from "../fakeData/dataFakeCapitalShips.data";

export function findPlayer(userId: number): Player | ErrorFindData {
  const player = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if (!player) {
    return {error: i18n.spainsh.errors.playerNotFound}
  }

  return player
}

export function findCapitalShip(shipId: number): CapitalShip | ErrorFindData {
  const CapitalShip = dataFakeCapitalShips.find(
    (p) => p.id === shipId
  );

  if (!CapitalShip) {
    return {error: i18n.spainsh.errors.capitalShipNotFound}
  }

  return CapitalShip
}