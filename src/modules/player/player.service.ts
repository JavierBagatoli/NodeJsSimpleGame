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
          circuits: player.resources.circuits,
          cores: player.resources.cores,
          metals: player.resources.metals,
          crystals: player.resources.crystals,
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
      inventory: player.inventory,
      stats: {
        damage: 1,
        defense: 0,
        actions: 2,

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
        credits: doc.data()?.wallet.credits ?? 0,
        platino: doc.data()?.wallet.platino ?? 0,
      },
      resources:{
        circuits: doc.data()?.resources.circuits ?? 0,
        cores: doc.data()?.resources.cores ?? 0,
        metals: doc.data()?.resources.metals ?? 0,
        crystals: doc.data()?.resources.crystals ?? 0,
      },
      equipment:{
        idWeapon: doc.data()?.equipment.idWeapon ?? 0,
        idShield: doc.data()?.equipment.idShield ?? 0,
        idArmor: doc.data()?.equipment.idArmor ?? 0,
        idRoom0: doc.data()?.equipment.idRoom0 ?? 0,
        idRoom1: doc.data()?.equipment.idRoom1 ?? 0,
        idRoom2: doc.data()?.equipment.idRoom2 ?? 0,
        idRoom3: doc.data()?.equipment.idRoom3 ?? 0,
        idRoom4: doc.data()?.equipment.idRoom4 ?? 0,
      },
      inventory: doc.data()?.inventory ?? [],
      imgProfile: doc.data()?.imgProfile ?? "",
      stats: {
        damage: doc.data()?.stats.damage ?? 0,
        defense: doc.data()?.stats.defense ?? 0,
        actions: doc.data()?.stats.actions ?? 0,

        damageShip: doc.data()?.stats.damageShip ?? 0,
        defenseShip: doc.data()?.stats.defenseShip ?? 0,
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