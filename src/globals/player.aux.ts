import { dataFakePlayers } from "../fakeData/fakeData.data";
import { PlayerDatabase } from "../modules/player/player.interfaces";
import { ErrorFindData } from "./error.interface";
import { i18n } from "../i18n/traslateMain.traslate";
import { CapitalShip } from "../modules/capitalShip/capitalShip.interfaces";
import { dataFakeCapitalShips } from "../fakeData/dataFakeCapitalShips.data";
import { getAuth } from "firebase-admin/auth";
import { db } from "../firebase";
import { TABLE_PLAYER } from "./tablesOfDatabase.consts";

export async function findPlayer(userId: string): Promise<PlayerDatabase | ErrorFindData> {
  //const player = dataFakePlayers.find(
  //  (p) => p.id === userId
  //);

  try{
    const userRef = db.collection(TABLE_PLAYER).doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return {error: `No se han encontrado datos ${userId}`}
    }
    return doc.data() as PlayerDatabase
  } catch (error: any) {
    return({ error: 'Error al obtener el usuario: ' + error.message });
  }

  
  //if (!player) {
  //  return {error: i18n.spainsh.errors.playerNotFound}
  //}
//
  //return player
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