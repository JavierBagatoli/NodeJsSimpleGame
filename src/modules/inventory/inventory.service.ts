import { dataFakeItemBase, Item } from "../../fakeData/fakeBiblioteca.data";
import { findPlayer } from "../../globals/player.aux";
import { Player } from "../player/player.interfaces";

/**
 * 
 * @param userId 
 * @param idSlot 
 * @param idItem 
 * @returns 
 */
export async function setInvetory(userId: number, idSlot: string, idItem: number) {
  let player = findPlayer(userId)
  if("error" in player) return player;

  if(!player.invetory.find(item => item.id === idItem)) return {error: `El usuario no dispone del item ${idItem}`}

  if(!dataFakeItemBase[idItem]) return
  switch (idSlot.split("-")[1]) {
    case 'weapon':
      if(dataFakeItemBase[idItem].type !== 'weapon'){
        return errorItem()
      }
      player.equipment.idWeapon = idItem;
      return {success: 'Equipamiento actualizado'};
    case 'armor':
      if(dataFakeItemBase[idItem].type !== 'armor'){
        return errorItem()
      }
      player.equipment.idArmor = idItem;
      return {success: 'Equipamiento actualizado'};
    case 'shield':
      if(dataFakeItemBase[idItem].type !== 'shield'){
        return errorItem()
      }
      player.equipment.idShield = idItem;
      return {success: 'Equipamiento actualizado'};
    case 'room0':
    case 'room1':
    case 'room2':
    case 'room3':
    case 'room4':
      if(dataFakeItemBase[idItem].type !== 'room'){
        return errorItem()
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

      updateStats(player)
      return {success: 'Equipamiento actualizado'};
  
    default:
      return errorItem()
  }
}

function errorItem(){
  return {error: 'El objeto no es compatible con el ranura'}
}

function updateStats(player: Player){
  //Stats Player
  const weapon: Item = dataFakeItemBase[player.equipment.idWeapon]
  const armor: Item = dataFakeItemBase[player.equipment.idArmor]
  const shield: Item = dataFakeItemBase[player.equipment.idShield]

  //Ship
  const partOfRoom0: Item = dataFakeItemBase[player.equipment.idRoom0]
  const partOfRoom1: Item = dataFakeItemBase[player.equipment.idRoom1]
  const partOfRoom2: Item = dataFakeItemBase[player.equipment.idRoom2]
  const partOfRoom3: Item = dataFakeItemBase[player.equipment.idRoom3]
  const partOfRoom4: Item = dataFakeItemBase[player.equipment.idRoom4]


  player.stats = {
    damage: weapon.damage + armor.damage + shield.damage,
    defense: weapon.defense + armor.defense + shield.defense,
    actions: 2 + weapon.actions + armor.actions + shield.actions,
  
    damageShip: 0 + partOfRoom0.damage + partOfRoom1.damage + partOfRoom2.damage +partOfRoom3.damage +partOfRoom4.damage,
    defenseShip: 0 + partOfRoom0.defense + partOfRoom1.defense + partOfRoom2.defense +partOfRoom3.defense +partOfRoom4.defense,
  }
}