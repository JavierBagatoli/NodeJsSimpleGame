import { EnemyStatscontrol } from "../dungeon/dungeon.interfaces"

export interface Player {
  id: number,
  username: string,
  capitalShipId: number,
  dinero: number,
  platino: number,
  potions: PlayerPotions,
  resourses: PlayerResourses,
  stats: PlayerStats
  dungeonInfo: DungeonInfoPlayer,
  invetory: InvetoryItemPlayer[],
  equipment: Equipment,
}

export interface PlayerStats{
    damage: number,
    defense: number,
    actions: number,

    damageShip: number,
    defenseShip: number,
}

export interface PlayerResourses{
    circuits: number,
    cores: number,
    metals: number,
    cristals: number,
}

export interface PlayerPotions{
    speed: number,
    damage: number,
}

export interface DungeonInfoPlayer{
    level: number,
    maxLifePlayer: number,
    lifePlayer: number,
    enemy: EnemyStatscontrol | null
    lastDeathOnDungeon: string | null
}

export interface playerInvetory{
    id: number
}

export interface Equipment{
    idWeapon: number,
    idShield: number,
    idArmor: number,
    idRoom0: number,
    idRoom1: number,
    idRoom2: number,
    idRoom3: number,
    idRoom4: number,
}

export interface InvetoryItemPlayer{
  id: number;
  cantidad: number
}