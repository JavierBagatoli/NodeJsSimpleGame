import { dataFakeItemBase } from "../../fakeData/fakeBiblioteca.data";
import { ErrorFindData } from "../../globals/error.interface";
import { findCapitalShip, findPlayer } from "../../globals/player.aux";
import { EnemyStatscontrol } from "./dungeon.interfaces";

export async function getListOfDungeonsAvalibles(userId: number) {
  const player = findPlayer(userId)
  if(!player || 'error' in player) return player

  const ship = findCapitalShip(player.capitalShipId)
  if(!ship || 'error' in ship) return ship

  return ship.dungeonAvalibles;
}

export async function getCreateEnemy(userId: number, level: number):Promise<EnemyStatscontrol | ErrorFindData> {
  let player = findPlayer(userId)

  if(!player || "error" in player) return player

  const expectedLife = Math.round(Math.random()*10*(level+1))

  const enemy: EnemyStatscontrol = {
    idTypeImage: Math.floor(Math.random()*5),
    dificultad: level+1,
    life: expectedLife,
    lifeMax: expectedLife,
    bonos: {
      defense: 0,
      attack: 0,
      actions: 0,
      luck: 0
    },
    baseAttack: 1,
    actions: 1,
    actionsMax: 1,
    states: [],
    debuf: {
        poison: 0,
        slowness: 0,
        fire: 0,
        fragil: 0,
    }
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

  let slownessDamage = enemyForPlayer.debuf.slowness > 0 ? enemyForPlayer.debuf.slowness -1: 0;
  let poisonDamage = enemyForPlayer.debuf.poison > 0 ? enemyForPlayer.debuf.poison -1: 0;
  let fireDamage = enemyForPlayer.debuf.fire > 0 ? enemyForPlayer.debuf.fire -1: 0;
  let fragilDamage = enemyForPlayer.debuf.fragil > 0 ? enemyForPlayer.debuf.fragil -1: 0;

  if(dataFakeItemBase[player.equipment.idWeapon]?.buff.length > 0){
    const item = dataFakeItemBase[player.equipment.idWeapon]

    item.buff.forEach(buff => {
      if(buff.prop < Math.random()*100){
        if(buff.type === 'slow'){
          slownessDamage++
        }else if(buff.type === 'poison'){
          poisonDamage++
        }else if(buff.type === 'fire'){
          fireDamage++
        }else if(buff.type === 'fragil'){
          fragilDamage++
        }
      }
    })
  }  

  player.dungeonInfo.enemy = {
    ...enemyForPlayer,
    life: enemyForPlayer.life -1*countOfAttacks,
    debuf:{
      slowness: slownessDamage,
      poison: poisonDamage,
      fire: fireDamage,
      fragil: fragilDamage,
    }
  }

  if(player.dungeonInfo.enemy.life > 0){
    //player.dungeonInfo.lifePlayer = player.dungeonInfo.lifePlayer-1
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

    player.dungeonInfo.enemy = null
    const newEnemy = await getCreateEnemy(userId, player.dungeonInfo.level)?? null

    if("life" in newEnemy){
      player.dungeonInfo.enemy = newEnemy;
    }

    //update Inventario
    const suerte: number = 1
    const drop = Math.random()* 100 < 10*suerte

    if(drop){
      switch (player.dungeonInfo.level % 4) {
        case 0:
          player.resourses.metals = ++player.resourses.metals
          break;
        case 1:
          player.resourses.cristals = ++player.resourses.cristals
          break;
        case 2:
          player.resourses.circuits = ++player.resourses.circuits
          break;
        case 3:
          player.resourses.cores = ++player.resourses.cores
          break;
      }
    }
    //retornar el item que gano, para activar la animacion
  }
   return enemyForPlayer;
}