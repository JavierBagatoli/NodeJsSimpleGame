import { Player } from "../modules/player/player.interfaces";

export const playerMock: Player = {
  id: 1,
  username: "Jab",
  capitalShipId: 1,
  dinero: 124,
  platino: 12,
  potions:{
    speed: 2,
    damage: 1,
  },
  resourses:{
    circuits: 23,
    cores: 44,
    metals: 55,
    cristals: 32,
  },
  stats:{
    damage: 0,
    defense: 0,
    actions: 0,
  }
}

export const dataFakePlayers: Player[] = [playerMock]