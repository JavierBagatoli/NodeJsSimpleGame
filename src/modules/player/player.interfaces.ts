import { Enemy } from "../dungeon/dungeon.interfaces"

export interface Player {
  id: number,
  username: string,
  capitalShipId: number,
  dinero: number,
  platino: number,
  potions: PlayerPotions,
  resourses: PlayerResourses,
  stats: PlayerStats
  dungeonInfo: DungeonInfoPlayer
}

export interface PlayerStats{
    damage: number,
    defense: number,
    actions: number,
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
    enemy: Enemy | null
    lastDeathOnDungeon: string | null
}