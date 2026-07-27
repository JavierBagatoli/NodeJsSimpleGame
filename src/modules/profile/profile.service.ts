import { dataFakePlayers } from "../../fakeData/fakeData.data";
import { db } from "../../firebase";
import { ErrorFindData } from "../../globals/error.interface";
import { Player } from "../player/player.interfaces";
import { Profile } from "./profile.interfaces";

export async function getProfile(userId: string): Promise<Profile | ErrorFindData> {
  let player: Profile | Player | undefined = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if(!player){
    try{
    
    const userRef = db.collection('Player').doc(userId);
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
    name: player.username,
    imgProfile: "0",
   }
}

export async function UpdateProfile(userId: string, data: Profile): Promise<Profile | ErrorFindData> {
  let player: Profile | Player | undefined = dataFakePlayers.find(
    (p) => p.id === userId
  );

  if(!player){
    try{
    
    const userRef = db.collection('Player').doc(userId);
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
    name: player.username,
    imgProfile: ''
   }
}

