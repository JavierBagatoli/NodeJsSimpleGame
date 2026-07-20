import { dataFakeItemBase } from "../../fakeData/fakeBiblioteca.data";
import { findPlayer } from "../../globals/player.aux";

export const tryBuyItemForPlayer = (userId: number, itemId: number) => {
  let player = findPlayer(userId)
  if("error" in player) return player;

  const itemSelected = dataFakeItemBase[itemId]
  if(!itemSelected){return {error: 'El item no existe'}}


  const difCircuitos = (player.resourses.circuits - (itemSelected.coste.circuito ?? 0))
  const difMetal = (player.resourses.metals - (itemSelected.coste.metal ?? 0))
  const difCore = (player.resourses.cores - (itemSelected.coste.nucleo ?? 0))
  const difCristals = (player.resourses.cristals - (itemSelected.coste.cristal ?? 0))

  if(!(difCircuitos >= 0) || !(difMetal >= 0)  || !(difCore >= 0)  || !(difCristals >= 0) ) return {error: "No dispone de recursos suficientes"}

  const postItem = player.invetory.findIndex(item => item.id === itemId)

  let response = {}

  if(postItem !== -1){
    player.invetory[postItem] = {
      ...player.invetory[postItem],
      cantidad: player.invetory[postItem].cantidad+1
    }
    response = player.invetory[postItem]
  }else if(postItem === -1){
    player.invetory.push({
    ...itemSelected,
    cantidad: 1})

    response = {
    ...itemSelected,
    cantidad: 1}
  }

  return response
}