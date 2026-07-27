import { dataFakePlayers } from "../../fakeData/fakeData.data";
import { db } from "../../firebase";

export async function getPlayer(userId: string) {
  let player = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if(!player){
    try{
    
    const userRef = db.collection('Player').doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return { error: 'Usuario no encontrado' }
    }

    return createDataPlayer(doc);
    } catch (error: any) {
      return({ error: 'Error al obtener el usuario: ' + error.message });
    }

    
  }else{}

   return player
}

export async function refreshById(userId: string){
  try{
    const userRef = db.collection('Player').doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return { error: 'Usuario no encontrado' }
    }

    return createDataPlayer(doc);
  }catch(error: any){
    return {error: error}
  }
}

function createDataPlayer(doc: any){
  return { 
      id: doc.id, 
      name: doc.data()?.name,
      wallet: {
        credits: doc.data()?.credits,
        platino: doc.data()?.platino,
      },
      resources:{
        circuits: doc.data()?.circuits,
        cores: doc.data()?.cores,
        metals: doc.data()?.metals,
        crystals: doc.data()?.crystals,
      }
    }
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