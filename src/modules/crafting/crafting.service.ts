import { dataFakeItemBase } from "../../fakeData/fakeBiblioteca.data";
import { db } from "../../firebase";
import { findPlayer } from "../../globals/player.aux";
import { TABLE_PLAYER } from "../../globals/tablesOfDatabase.consts";

export const tryBuyItemForPlayer = async (userId: string, itemId: number) => {
  let player = await findPlayer(userId)
  if("error" in player) return player;
  const userRef = db.collection(TABLE_PLAYER).doc(userId);
  const doc = await userRef.get();

  const itemSelected = dataFakeItemBase[itemId]
  if(!itemSelected){return {error: 'El item no existe'}}

  const difCircuitos = (player.resources.circuits - (itemSelected.coste.circuito ?? 0))
  const difMetal = (player.resources.metals - (itemSelected.coste.metal ?? 0))
  const difCore = (player.resources.cores - (itemSelected.coste.nucleo ?? 0))
  const difCrystals = (player.resources.crystals - (itemSelected.coste.cristal ?? 0))

  if(!(difCircuitos >= 0) || !(difMetal >= 0)  || !(difCore >= 0)  || !(difCrystals >= 0) ) return {error: "No dispone de recursos suficientes"}

  player.resources = {
    circuits: difCircuitos,
    metals: difMetal,
    cores: difCore,
    crystals: difCrystals,
  }

  const postItem = player.inventory.findIndex(item => item.id === itemId)

  let response = {}

  if(postItem !== -1){
    player.inventory[postItem] = {
      ...player.inventory[postItem],
      cantidad: player.inventory[postItem].cantidad+1
    }
    response = player.inventory[postItem]
  }else if(postItem === -1){
    player.inventory.push({
      id: itemSelected.id,
      cantidad: 1})

    response = {
      id: itemSelected.id,
      cantidad: 1
    }
  }

  await userRef.update({
    ...doc.data(),
    resources: player.resources,
    inventory: player.inventory,
  })

  return response
}