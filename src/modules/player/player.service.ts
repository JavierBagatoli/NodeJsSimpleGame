import { dataFakePlayers } from "../../fakeData/fakeData.data";
import { db } from "../../firebase";
import { ErrorFindData } from "../../globals/error.interface";
import { NEW_PLAYER } from "./player.constants";
import { Player, PlayerContext } from "./player.interfaces";

export async function getPlayer(userId: string): Promise<PlayerContext | ErrorFindData> {
  let player: PlayerContext | Player | undefined = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if(!player){
    try{
    
    const userRef = db.collection('Player').doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return createPlayer(userId)
    }

    return createDataPlayer(doc);
    } catch (error: any) {
      return({ error: 'Error al obtener el usuario: ' + error.message });
    }
  }else{
    player = {
      id: player.id,
      name: player.username,
      imgProfile: "0",
      wallet: {
          credits: player.dinero,
          platino: player.platino,
      },
      resources:{
          circuits: player.resourses.circuits,
          cores: player.resourses.cores,
          metals: player.resourses.metals,
          crystals: player.resourses.cristals,
      },
      equipment:{
        idWeapon: 0,
        idShield: 0,
        idArmor: 0,
        idRoom0: 0,
        idRoom1: 0,
        idRoom2: 0,
        idRoom3: 0,
        idRoom4: 0,
      },
      inventory: [],
      stats: {
        damage: 0,
        defense: 0,
        actions: 0,

        damageShip: 0,
        defenseShip: 0,
      }
    }
  }

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

function createDataPlayer(doc: any): PlayerContext{
  return { 
      id: doc.id, 
      name: doc.data()?.name,
      wallet: {
        credits: doc.data()?.credits ?? 0,
        platino: doc.data()?.platino ?? 0,
      },
      resources:{
        circuits: doc.data()?.circuits ?? 0,
        cores: doc.data()?.cores ?? 0,
        metals: doc.data()?.metals ?? 0,
        crystals: doc.data()?.crystals ?? 0,
      },
      equipment:{
        idWeapon: 0,
        idShield: 0,
        idArmor: 0,
        idRoom0: 0,
        idRoom1: 0,
        idRoom2: 0,
        idRoom3: 0,
        idRoom4: 0,
      },
      inventory: [],
      imgProfile: "",
      stats: {
        damage: 0,
        defense: 0,
        actions: 0,

        damageShip: 0,
        defenseShip: 0,
      }
    }
}

export async function createPlayer(userId: string): Promise<PlayerContext | ErrorFindData>{
  let newPlayer: PlayerContext = NEW_PLAYER
  newPlayer = {...newPlayer, id: userId}

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