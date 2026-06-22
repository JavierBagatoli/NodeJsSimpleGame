import { dataFakeCapitalShips } from "../../fakeData/dataFakeCapitalShips.data";
import { findCapitalShip, findPlayer } from "../../globals/player.aux";
import { getPlayer } from "../player/player.service";
import { CapitalShip } from "./capitalShip.interfaces";

export interface player {
    id: 1,
    username: "Player1",
    capitalShipId: 1,
  }

const players = [
  {
    id: 1,
    username: "Player1",
    capitalShipId: 1,
  },
];

export async function getPlayerCapitalShip(userId: number) {
  const player = players.find(
    (p) => p.id === userId
  );

  if (!player) {
    throw new Error("Jugador no encontrado");
  }

  const capitalShip: CapitalShip | undefined = dataFakeCapitalShips.find(
    (p) => p.id === player.capitalShipId
  );

  if(!capitalShip){
    throw new Error("No tiene nave capital");
  }

  return capitalShip;
}

export async function postMoveCapitalShip(userId: number) {
  const player = players.find(
    (p) => p.id === userId
  );

  if (!player) {
    throw new Error("Jugador no encontrado");
  }

  const capitalShip: CapitalShip | undefined = dataFakeCapitalShips.find(
    (p) => p.id === player.capitalShipId
  );

  if(!capitalShip){
    throw new Error("No tiene nave capital");
  }

  return capitalShip;
}

/**
 * 
 * @param userId 
 * @param capitalShipId 
 * @param zona 
 * @returns 
 */
export async function changeCapitalShip(userId: number, capitalShipId: number, zona: number) {
  const player =  findPlayer(userId)
  if("error" in player) return player

  const capitalShip = findCapitalShip(capitalShipId)
  if("error" in capitalShip) return capitalShip

  if(player.id !== capitalShip.idLeader) return {error: "No tiene permiso para controlar la nave capital"}
  
  player.capitalShipId = capitalShipId;

  return {
    message: `${capitalShip.name} se ha movido a la zona ${zona}`,
  };
}