import { dataFakeItemBase, Item } from "../../fakeData/fakeBiblioteca.data";
import { db } from "../../firebase";
import { ErrorFindData } from "../../globals/error.interface";
import { findPlayer } from "../../globals/player.aux";
import { TABLE_PLAYER } from "../../globals/tablesOfDatabase.consts";
import { PlayerDatabase } from "../player/player.interfaces";

export async function getInventario(userId: string) {
  let player = await findPlayer(userId)
  if("error" in player) return player;

  return player.inventory
}

const ROOMS = ['room0','room1','room2','room3','room4',]
/**
 * 
 * @param userId 
 * @param idSlot 
 * @param idItem 
 * @returns 
 */
export async function setInvetory(userId: string, idSlot: string, idItem: number):Promise<PlayerDatabase | ErrorFindData> {
  let player: PlayerDatabase |ErrorFindData = await findPlayer(userId)
  if("error" in player) return player;

  if(!player.inventory.find(item => item.id === idItem)) return {error: `El usuario no dispone del item ${idItem}`}
  let response : { error: string } | { success: string } = errorItem()

  if(!dataFakeItemBase[idItem]) return {error: "Item No encontrado"}
  let option: string = idSlot.split("-")[1];
  if(option === 'weapon'){
    if(dataFakeItemBase[idItem].type !== 'weapon'){
      response = errorItem();
    }
    player.equipment.idWeapon = idItem;
    response = successItem();
  }else if(option === 'armor'){
    if(dataFakeItemBase[idItem].type !== 'armor'){
      response =  errorItem();
    }
    player.equipment.idArmor = idItem;
    response = successItem();
  }else if(option === 'shield'){
    if(dataFakeItemBase[idItem].type !== 'shield'){
      response =  errorItem();
    }
    player.equipment.idShield = idItem;
    response = successItem();
  }else if(ROOMS.includes(option)){
     if(dataFakeItemBase[idItem].type !== 'room'){
        response =  errorItem();
      }

      if(idSlot === 'room0'){
        player.equipment.idRoom0 = idItem;
      }else if(idSlot === 'room1'){
        player.equipment.idRoom1 = idItem;
      }else if(idSlot === 'room2'){
        player.equipment.idRoom2 = idItem;
      }else if(idSlot === 'room3'){
        player.equipment.idRoom3 = idItem;
      }else if(idSlot === 'room4'){
        player.equipment.idRoom4 = idItem;
      }
  }

  updateStats(player)
  
  const userRef = db.collection(TABLE_PLAYER).doc(userId);
  const doc = await userRef.get();

  userRef.update({
    ...doc.data(),
    equipment: player.equipment,
    stats: player.stats
  })

  return player
}

function errorItem(){
  return {error: 'El objeto no es compatible con el ranura'}
}

function successItem(){
  return {success: 'Equipamiento actualizado'};
}

export function updateStats(player: any){
  //Stats Player
  const weapon: Item = dataFakeItemBase[player.equipment.idWeapon];
  const armor: Item = dataFakeItemBase[player.equipment.idArmor];
  const shield: Item = dataFakeItemBase[player.equipment.idShield];

  //Ship
  const partOfRoom0: Item = dataFakeItemBase[player.equipment.idRoom0];
  const partOfRoom1: Item = dataFakeItemBase[player.equipment.idRoom1];
  const partOfRoom2: Item = dataFakeItemBase[player.equipment.idRoom2];
  const partOfRoom3: Item = dataFakeItemBase[player.equipment.idRoom3];
  const partOfRoom4: Item = dataFakeItemBase[player.equipment.idRoom4];

  player.stats = {
    damage: weapon.damage + armor.damage + shield.damage,
    defense: weapon.defense + armor.defense + shield.defense,
    actions: 2 + weapon.actions + armor.actions + shield.actions,
  
    damageShip: 0 + partOfRoom0.damage + partOfRoom1.damage + partOfRoom2.damage +partOfRoom3.damage +partOfRoom4.damage,
    defenseShip: 0 + partOfRoom0.defense + partOfRoom1.defense + partOfRoom2.defense +partOfRoom3.defense +partOfRoom4.defense,
  };
}