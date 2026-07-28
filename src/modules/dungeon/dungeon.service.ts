import { dataFakeItemBase } from "../../fakeData/fakeBiblioteca.data";
import { db } from "../../firebase";
import { ErrorFindData } from "../../globals/error.interface";
import { findCapitalShip, findPlayer } from "../../globals/player.aux";
import { EnemyStatscontrol } from "./dungeon.interfaces";

export async function getListOfDungeonsAvalibles(userId: string) {
  //const player = findPlayer(userId)
  //if(!player || 'error' in player) return player
//
  //const ship = findCapitalShip(player.capitalShipId)
  //if(!ship || 'error' in ship) return ship
//
  return [1,2,3,4]//ship.dungeonAvalibles;
}

export async function getCreateEnemy(userId: string, level: number):Promise<EnemyStatscontrol | ErrorFindData> {
  //let player = findPlayer(userId)
  //if(!player || "error" in player) return player

  const expectedLife = Math.round(Math.random()*10*(level+1))

  const enemy: EnemyStatscontrol = {
    id: userId,
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

  try{
    const userRef = db.collection('Enemy').doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      await userRef.create(enemy)
    }else{
      await userRef.update(enemy)
    }
  }catch(err){}

  return enemy;
}

export async function getEndTurn(userId: string, actions: string[]) {
  const todayDate = new Date();
  const shortFormDate = `${todayDate.getDate()}-${todayDate.getMonth()+1}`

  //let player = findPlayer(userId)

  //if(!player || 'error' in player) return

  //if(player.dungeonInfo.lastDeathOnDungeon === shortFormDate) return 4

  const userRef = db.collection('Player').doc(userId);
  const docPlayer = await userRef.get();

  if(!docPlayer || 'error' in docPlayer) return

  let player = docPlayer.data()!

  let countOfAttacks: number = 0
  let countOfDefenses: number = player.stats.defense
  
  if(actions.length !== player.stats.actions){return 1}

  actions.forEach((val: string) => {
    if(val === 'atk'){
      countOfAttacks++
    }else if(val === 'def'){
      countOfDefenses++
    }
  })

  const userRefEnemy = db.collection('Enemy').doc(userId);
  const docEnemy = await userRefEnemy.get();

  let enemyForPlayer = docEnemy.data()
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

  let finalEnemy =  {
    ...enemyForPlayer,
    life: enemyForPlayer.life -player.stats.damage*countOfAttacks,
    debuf:{
      slowness: slownessDamage,
      poison: poisonDamage,
      fire: fireDamage,
      fragil: fragilDamage,
    }
  }

  if(finalEnemy.life > 0){
    if(countOfDefenses <= 0){
      //player.dungeonInfo.lifePlayer = player.dungeonInfo.lifePlayer-1
    }else{
      countOfDefenses > 0? countOfDefenses = countOfDefenses-enemyForPlayer.baseAttack: countOfDefenses = 0
    }

    //if(player.dungeonInfo.lifePlayer <= 0){
      //player.dungeonInfo.lastDeathOnDungeon = shortFormDate
    //  return 3
    //}
  }

  let addResources: boolean = false;
  if(finalEnemy.life <= 0){
    const typeResource = enemyForPlayer.dificultad % 4
    if(typeResource === 0){
      player.resources.circuits = player.resources.circuits+1
    }else if(typeResource === 1){
      player.resources.cores = player.resources.cores+1
    }else if(typeResource === 2){
      player.resources.cristals = player.resources.cristals+1
    }else if(typeResource === 3){
      player.resources.metals = player.resources.metals+1
    }

    enemyForPlayer = undefined
    const newEnemy = await getCreateEnemy(userId, 0 /*player.dungeonInfo.level*/)?? null

    if("life" in newEnemy){
      finalEnemy = newEnemy;
    }

    //update Inventario
    const suerte: number = 1
    const drop = Math.random()* 100 < 10*suerte

    if(drop){
      switch (player.dungeonInfo.level % 4) {
        case 0:
          player.resources.metals = ++player.resources.metals
          break;
        case 1:
          player.resources.cristals = ++player.resources.cristals
          break;
        case 2:
          player.resources.circuits = ++player.resources.circuits
          break;
        case 3:
          player.resources.cores = ++player.resources.cores
          break;
      }
    }
    
    addResources= true;
    userRef.update({...player,
      resources: player.resources
    })    
  }
  
  await userRefEnemy.update(finalEnemy)
  return addResources? {
    ...finalEnemy,
    resources: player.resources,
  }: finalEnemy;
}