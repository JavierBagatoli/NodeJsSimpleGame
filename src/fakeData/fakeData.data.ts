import { Player } from "../modules/player/player.interfaces";

export const playerMock: Player = {
  id: 1,
  username: "Jab",
  capitalShipId: 0,
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
    actions: 2,
  },
  dungeonInfo:{
    level: 1,
    maxLifePlayer: 10,
    lifePlayer: 10,
    enemy: null,
    lastDeathOnDungeon: null
  },
  invetory: [{
    id:1,
    cantidad:10
  },{
    id:2,
    cantidad:4
  },{
    id:3,
    cantidad:5
  },{
    id:4,
    cantidad:9
  }],
  equipment: {
    idWeapon: 50,
    idShield: 0,
    idArmor: 0,
    idRoom0: 0,
    idRoom1: 0,
    idRoom2: 0,
    idRoom3: 0,
    idRoom4: 0,

  }
}

export const dataFakePlayers: Player[] = [playerMock]