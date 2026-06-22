import { ErrorFindData } from "../../globals/error.interface";
import { findCapitalShip, findPlayer } from "../../globals/player.aux";
import { Enemy } from "./dungeon.interfaces";

export async function getListOfDungeonsAvalibles(userId: number) {
  const player = findPlayer(userId)
  if(!player || 'error' in player) return player

  const ship = findCapitalShip(player.capitalShipId)
  if(!ship || 'error' in ship) return ship

  return ship.dungeonAvalibles;
}

export async function getCreateEnemy(userId: number, level: number):Promise<Enemy | ErrorFindData> {
  let player = findPlayer(userId)

  if(!player || "error" in player) return player

  const enemy: Enemy = {
    dificultad: level,
    life: Math.round(Math.random()*10*level),
    states: []
  }

  player.dungeonInfo.enemy = enemy

  return enemy;
}

export async function getEndTurn(userId: number, actions: string[]) {
  const todayDate = new Date();
  const shortFormDate = `${todayDate.getDate()}-${todayDate.getMonth()+1}`

  let player = findPlayer(userId)

  if(!player || 'error' in player) return

  if(player.dungeonInfo.lastDeathOnDungeon === shortFormDate) return 4

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

  let enemyForPlayer = player.dungeonInfo.enemy
  if(!enemyForPlayer) return 2

  player.dungeonInfo.enemy = {
    ...enemyForPlayer,
    life: enemyForPlayer.life -1*countOfAttacks
  }

  if(player.dungeonInfo.enemy.life > 0){
    player.dungeonInfo.lifePlayer = player.dungeonInfo.lifePlayer-1
    if(player.dungeonInfo.lifePlayer <= 0){
      player.dungeonInfo.enemy = null
      player.dungeonInfo.lastDeathOnDungeon = shortFormDate
      return 3
    }
  }


  if(player.dungeonInfo.enemy.life <= 0){
    const typeResource = player.dungeonInfo.enemy.dificultad % 4
    if(typeResource === 0){
      player.resourses.circuits = player.resourses.circuits+1
    }else if(typeResource === 1){
      player.resourses.cores = player.resourses.cores+1
    }else if(typeResource === 2){
    player.resourses.cristals = player.resourses.cristals+1
    }else if(typeResource === 3){
      player.resourses.metals = player.resourses.metals+1
    }

    player.dungeonInfo.enemy.life = Math.round(Math.random()*10*player.dungeonInfo.enemy.dificultad),
    player.dungeonInfo.enemy.states = []
  }

   return enemyForPlayer;
}