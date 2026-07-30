import { PlayerResourses } from "../player/player.interfaces";

export default interface StatsControl{
  life: number,
  lifeMax: number,
  bonos: {
    defense: number,
    attack: number,
    actions: number,
    luck: number
  }
  baseAttack: number;
  actions: number,
  actionsMax: number,
}

export interface EnemyDatabase {
  actions: number;
  actionsMax: number;
  baseAttack: number;

  bonos: EnemyBonos

  debuf: DebufEnemy;

  dificultad: number;
  id: string;
  idTypeImage: number;
  life: number;
  lifeMax: number;
}

export interface EnemyBonos {
  actions: number;
  attack: number;
  defense: number;
  luck: number;
};

export interface DebufEnemy {
  fire: number;
  fragil: number;
  poison: number;
  slowness: number;
};