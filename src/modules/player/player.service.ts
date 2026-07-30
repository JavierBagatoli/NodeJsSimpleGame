import { dataFakePlayers } from "../../fakeData/fakeData.data";
import { db } from "../../firebase";
import { ErrorFindData } from "../../globals/error.interface";
import { TABLE_PLAYER } from "../../globals/tablesOfDatabase.consts";
import { NEW_PLAYER } from "./player.constants";
import { PlayerContext, PlayerDatabase } from "./player.interfaces";

export async function getPlayer(userId: string): Promise<PlayerDatabase | ErrorFindData> {
  let player: PlayerDatabase | undefined = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if(!player){
    try{
    
    const userRef = db.collection(TABLE_PLAYER).doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return createPlayer(userId)
    }

    return doc.data() as PlayerDatabase;
    } catch (error: any) {
      return({ error: 'Error al obtener el usuario: ' + error.message });
    }
  }
  
   return player
}

export async function refreshById(userId: string): Promise<PlayerDatabase | ErrorFindData>{
  try{
    const userRef = db.collection(TABLE_PLAYER).doc(userId);
    const doc = await userRef.get(); 

    if (!doc.exists) {
      return { error: 'Usuario no encontrado' }
    }

    return (doc.data() as PlayerDatabase) ;
  }catch(error: any){
    return {error: error}
  }
}

export async function createPlayer(userId: string): Promise<PlayerDatabase | ErrorFindData>{
  let newPlayer: PlayerDatabase = NEW_PLAYER(userId)

  let success: boolean = false;
  let err: any = {error : "No se a creado aun"}
  await db.collection("Player").doc(userId).set(newPlayer).then(_val => success)
    .catch(error => err = {error: error})

  return success? newPlayer: err
}

export async function getPlayerStats(userId: string) {
  const player = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if (!player) {
    throw new Error("Jugador no encontrado");
  }

   return player.stats;
}