import { findPlayer } from "../../globals/player.aux";
import { Enemy } from "./dungeon.interfaces";

let SuperEnemy: Enemy | null = null

export async function getListOfDungeonsAvalibles(userId: number) {
  const player = findPlayer(userId)
  if(!player) return

  return 4;
}

export async function getCreateEnemy(userId: number, level: number):Promise<Enemy> {
  const player = findPlayer(userId)

  const enemy: Enemy = {
    dificultad: level,
    life: Math.round(Math.random()*10*level),
    states: []
  }

  SuperEnemy = enemy

  return enemy;
}

export async function getEndTurn(userId: number, actions: string[]) {
  const player = findPlayer(userId)

  if(!player) return

  let countOfAttacks: number = 0
  let countOfDefenses: number = 0
  
  if(actions.length !== player.stats.actions){return 1}

  actions.forEach((val: string) => {
    if(val === 'atk'){
      countOfAttacks++
    }else if(val === 'def'){
      countOfDefenses++
    }
  })

  if(!SuperEnemy)return 2

  SuperEnemy = {
    ...SuperEnemy,
    life: SuperEnemy.life -10*countOfAttacks
  }

   return SuperEnemy;
}