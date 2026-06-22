import { CapitalShip } from "../modules/capitalShip/capitalShip.interfaces";

export const capitalShip0: CapitalShip = {
  id: 0,
  name: 'Avatar',
  dungeonAvalibles: [0,1,2,3],
  idZone:0,
  idLeader: 1,
}


export const capitalShip2: CapitalShip = {
  id: 1,
  name: 'Terra',
  dungeonAvalibles: [4,5,6,7],
  idZone:1,
  idLeader: 1,
}

export const dataFakeCapitalShips: CapitalShip[] = [capitalShip0]