import { dataFakePlayers } from "../../fakeData/fakeData.data";
import { db } from "../../firebase";
import { ErrorFindData } from "../../globals/error.interface";
import { TABLE_PLAYER } from "../../globals/tablesOfDatabase.consts";
import { PlayerDatabase } from "../player/player.interfaces";
import { Profile } from "./profile.interfaces";

export async function getProfile(userId: string): Promise<Profile | ErrorFindData> {
  let player: Profile | PlayerDatabase | undefined = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if(!player){
    try{
    
    const userRef = db.collection(TABLE_PLAYER).doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return {error: `No se han encontrado datos ${userId}`}
    }

    return {
      name: doc.data()?.name,
      imgProfile: doc.data()?.imgProfile,
    };
    } catch (error: any) {
      return({ error: 'Error al obtener el usuario: ' + error.message });
    }
  }

   return {
    name: player.name,
    imgProfile: "0",
   }
}

export async function UpdateProfile(userId: string, data: Profile): Promise<Profile | ErrorFindData> {
  let player: Profile | PlayerDatabase | undefined = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if(!player){
    try{
    
    const userRef = db.collection(TABLE_PLAYER).doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
      return {error: `No se han encontrado datos ${userId}`}
    }
    
    await userRef.update({
      name: data.name,
      imgProfile: data.imgProfile
    }).then(val => console.log(val)).catch(err => console.log("err", err))

    return {
      name: doc.data()?.name,
      imgProfile: doc.data()?.imgProfile,
    };
    } catch (error: any) {
      return({ error: 'Error al obtener el usuario: ' + error.message });
    }
  }

   return {
    name: player.name,
    imgProfile: ''
   }
}

