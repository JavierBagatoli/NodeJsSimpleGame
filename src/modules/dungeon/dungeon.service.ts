import { dataFakeItemBase } from "../../fakeData/fakeBiblioteca.data";
import { db } from "../../firebase";
import { ErrorFindData } from "../../globals/error.interface";
import { TABLE_ENEMY, TABLE_PLAYER } from "../../globals/tablesOfDatabase.consts";
import { EnemyDatabase, PlayerResoursesOptionals } from "./dungeon.interfaces";

export async function getListOfDungeonsAvalibles(userId: string) {
  //const player = findPlayer(userId)
  //if(!player || 'error' in player) return player
//
  //const ship = findCapitalShip(player.capitalShipId)
  //if(!ship || 'error' in ship) return ship
//
  return [1,2,3,4]//ship.dungeonAvalibles;
}

export async function getCreateEnemy(userId: string, dificultad: number):Promise<EnemyDatabase | ErrorFindData> {
  //let player = findPlayer(userId)
  //if(!player || "error" in player) return player

  const expectedLife = Math.round(Math.random()*10*(dificultad+1))
  const damage: number = setDamage(dificultad)


  const enemy: EnemyDatabase = {
    id: userId,
    idTypeImage: Math.floor(Math.random()*5),
    dificultad: dificultad+1,
    life: expectedLife,
    lifeMax: expectedLife,
    bonos: {
      defense: 0,
      attack: damage,
      actions: 0,
      luck: 0,
    },
    baseAttack: 1,
    actions: 1,
    actionsMax: 1,
    debuf: {
        poison: 0,
        slowness: 0,
        fire: 0,
        fragil: 0,
    }
  }

  try{
    const userRef = db.collection(TABLE_ENEMY).doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      await userRef.create(enemy)
    }else{
      await userRef.update(enemy)
    }
  }catch(err){}

  return enemy;
}

const setDamage = (level: number): number => {
    let dmg: number = 0;
    if(level >= 4){
      dmg = 2;
    }else if(level >= 2){
      dmg = 1
    }
    return dmg
  }

export async function getEndTurn(userId: string, actions: string[]) {
  const todayDate = new Date();
  const shortFormDate = `${todayDate.getDate()}-${todayDate.getMonth()+1}`

  //let player = findPlayer(userId)

  //if(!player || 'error' in player) return

  //if(player.dungeonInfo.lastDeathOnDungeon === shortFormDate) return 4

  const userRef = db.collection(TABLE_PLAYER).doc(userId);
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

  const userRefEnemy = db.collection(TABLE_ENEMY).doc(userId);
  const docEnemy = await userRefEnemy.get();

  let enemyForPlayer: EnemyDatabase | undefined = docEnemy.data() as EnemyDatabase | undefined
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
    for (let index = 0. ; index < (enemyForPlayer.actions + enemyForPlayer.bonos.actions); index++) {
      if(countOfDefenses <= 0){
        //player.dungeonInfo.lifePlayer = player.dungeonInfo.lifePlayer-1
      }else{
        countOfDefenses > 0? countOfDefenses = countOfDefenses-enemyForPlayer.baseAttack: countOfDefenses = 0
      }
    }
    //if(player.dungeonInfo.lifePlayer <= 0){
    //  player.dungeonInfo.lastDeathOnDungeon = shortFormDate
    //  return 3
    //}
  }

  let addResources: boolean = false;
  const val: number = Math.round(Math.random())
 
  let sendNewItemsToFront: PlayerResoursesOptionals = {}

  if(finalEnemy.life <= 0){
    addResources= true;
    const typeResource = (enemyForPlayer.dificultad-1) % 4
    if(typeResource === 0){
      sendNewItemsToFront = {
        metals: 1
      }
    }else if(typeResource === 1){
      sendNewItemsToFront = {
        metals: val*3,
        crystals: 1
      }
    }else if(typeResource === 2){
      sendNewItemsToFront = {
        metals: val*3,
        crystals: val*2,
        circuits: 1
      }
    }else if(typeResource === 3){
      sendNewItemsToFront = {
        crystals: val*3,
        cores: 1
      }
    }
    
    player.resources.metals = player.resources.metals    +  (sendNewItemsToFront.metals ?? 0)
    player.resources.crystals = player.resources.crystals+  (sendNewItemsToFront.crystals ?? 0)
    player.resources.circuits = player.resources.circuits+  (sendNewItemsToFront.circuits ?? 0)
    player.resources.cores = player.resources.cores      +  (sendNewItemsToFront.cores ?? 0)

    const newEnemy = await getCreateEnemy(userId, enemyForPlayer.dificultad-1 )?? null
    enemyForPlayer = undefined

    if("life" in newEnemy){
      finalEnemy = newEnemy;
    }

    userRef.update({...player,
      resources: player.resources
    })   
  }

  await userRefEnemy.update(finalEnemy)
  return addResources? {
    ...finalEnemy,
    resources: sendNewItemsToFront,
  }: finalEnemy;
}