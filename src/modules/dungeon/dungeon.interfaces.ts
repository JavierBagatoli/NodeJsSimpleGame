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

export interface EnemyStatscontrol extends StatsControl{
    idTypeImage: number,
    dificultad: number,
    debuf: {
        poison: number,
        slowness: number,
    }
    states: string[]
}