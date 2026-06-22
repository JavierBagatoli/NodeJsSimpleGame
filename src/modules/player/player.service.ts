import { dataFakeItemBase } from "../../fakeData/fakeBiblioteca.data";
import { dataFakePlayers } from "../../fakeData/fakeData.data";
import { findPlayer } from "../../globals/player.aux";

export async function getPlayer(userId: number) {
  const player = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if (!player) {
    throw new Error("Jugador no encontrado");
  }

   return player;
}

export async function getPlayerStats(userId: number) {
  const player = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if (!player) {
    throw new Error("Jugador no encontrado");
  }

   return player.stats;
}

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

  if(!dataFakeItemBase[idItem]) return
  switch (idSlot) {
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
      return {success: 'Equipamiento actualizado'};
  
    default:
      return errorItem()

  }

   return player;
}

function errorItem(){
  return {error: 'El objeto no es compatible con el ranura'}
}