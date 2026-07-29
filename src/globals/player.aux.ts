import { dataFakePlayers } from "../fakeData/fakeData.data";
import { Player } from "../modules/player/player.interfaces";
import { ErrorFindData } from "./error.interface";
import { i18n } from "../i18n/traslateMain.traslate";
import { CapitalShip } from "../modules/capitalShip/capitalShip.interfaces";
import { dataFakeCapitalShips } from "../fakeData/dataFakeCapitalShips.data";
import { getAuth } from "firebase-admin/auth";
import { db } from "../firebase";

export async function findPlayer(userId: string): Promise<Player | ErrorFindData> {
  //const player = dataFakePlayers.find(
  //  (p) => p.id === userId
  //);

  try{
    const userRef = db.collection('Player').doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return {error: `No se han encontrado datos ${userId}`}
    }
    return adapterBasaDateToPlayer(doc.data())
  } catch (error: any) {
    return({ error: 'Error al obtener el usuario: ' + error.message });
  }

  
  //if (!player) {
  //  return {error: i18n.spainsh.errors.playerNotFound}
  //}
//
  //return player
}

function adapterBasaDateToPlayer(data: any):Player{
  return {
    id: data.id,
    username: data.name,
    capitalShipId: 0,
    dinero: data.wallet.credits,
    platino: data.wallet.platino,
    potions: {
      speed: 0,
      damage: 0,
    },
    resources: {
        circuits: data.resources.circuits,
        cores: data.resources.cores,
        metals: data.resources.metals,
        crystals: data.resources.crystals,
    },
    stats: {
      damage: data.stats.damage,
      defense: data.stats.defense,
      actions: data.stats.actions,
      damageShip: data.stats.damageShip,
      defenseShip: data.stats.defenseShip,
    } 
    ,
    dungeonInfo: {
      level: 0,
      maxLifePlayer: 0,
      lifePlayer: 0,
      enemy:  null,
      lastDeathOnDungeon: null
    },
    inventory: data.inventory,
    equipment: {
      idWeapon: data.equipment.idWeapon,
      idShield: data.equipment.idShield,
      idArmor: data.equipment.idArmor,
      idRoom0: data.equipment.idRoom0,
      idRoom1: data.equipment.idRoom1,
      idRoom2: data.equipment.idRoom2,
      idRoom3: data.equipment.idRoom3,
      idRoom4: data.equipment.idRoom4,
    },
  }
}

export function findCapitalShip(shipId: number): CapitalShip | ErrorFindData {
  const CapitalShip = dataFakeCapitalShips.find(
    (p) => p.id === shipId
  );

  if (!CapitalShip) {
    return {error: i18n.spainsh.errors.capitalShipNotFound}
  }

  return CapitalShip
}

export async function getIdToken(req: any){
  const token = (req.headers['authorization'] ?? "").split(" ")[1]
  
  return (await getAuth().verifyIdToken(token)).uid?? undefined;
}