import { Bones, Debuffs, Equipment, PlayerDatabase, PlayerResourses, PlayerStats, Wallet } from "./player.interfaces";

export const NEW_PLAYER = (id: string):PlayerDatabase =>  {  
  return {
    id: id, 
    name: "No Name",
    imgProfile: "0",
    actions: 2,
    actionsMax: 2,
    baseAttack: 1,

    debuf: DEBUF_PLAYER,
    dificultad: 0,
    idTypeImage: 0,
    life: 10,
    lifeMax: 10,

    bonos: BONOS_PLAYER,
    wallet: WALLET_PLAYER,
    resources: RESOURCES_PLAYER,
    equipment: EQUIPMENT,
    inventory: [],
    stats: STATS_PLAYER,
    states: []
  }
}

const EQUIPMENT: Equipment = {
  idWeapon: 0,
  idShield: 0,
  idArmor: 0,
  idRoom0: 0,
  idRoom1: 0,
  idRoom2: 0,
  idRoom3: 0,
  idRoom4: 0,
}

const STATS_PLAYER: PlayerStats = {
  damage: 0,
  defense: 0,
  actions: 0,

  damageShip: 0,
  defenseShip: 0,
}

const BONOS_PLAYER: Bones = {
   actions: 0,
    attack: 0,
    defense: 0,
    luck: 0,
}

const DEBUF_PLAYER: Debuffs = {
  fire: 0,
  fragil: 0,
  poison: 0,
  slowness: 0,
}

const RESOURCES_PLAYER: PlayerResourses = {
  circuits: 0,
  cores: 0,
  metals: 0,
  crystals: 0,
}

const WALLET_PLAYER: Wallet = {
  credits: 0,
  platino: 0,
}