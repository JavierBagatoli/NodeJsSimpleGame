import { PlayerContext } from "./player.interfaces";

export const NEW_PLAYER: PlayerContext ={ 
      id: "0", 
      name: "No Name",
      imgProfile: "0",
      wallet: {
        credits: 0,
        platino: 0,
      },
      resources:{
        circuits: 0,
        cores: 0,
        metals: 0,
        crystals: 0,
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