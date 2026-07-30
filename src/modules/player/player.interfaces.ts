/*export interface Player {
  id: string,
  username: string,
  capitalShipId: number,
  dinero: number,
  platino: number,
  potions: PlayerPotions,
  resources: PlayerResourses,
  stats: PlayerStats,
  dungeonInfo: DungeonInfoPlayer,
  inventory: InvetoryItemPlayer[],
  equipment: Equipment,
}
*/
export interface PlayerStats{
    damage: number,
    defense: number,
    actions: number,

    damageShip: number,
    defenseShip: number,
}

export interface PlayerResourses{
    circuits: number,
    cores: number,
    metals: number,
    crystals: number,
}

export interface PlayerPotions{
    speed: number,
    damage: number,
}

export interface DungeonInfoPlayer{
    level: number,
    maxLifePlayer: number,
    lifePlayer: number,
    enemy: any | null
    lastDeathOnDungeon: string | null
}

export interface playerInvetory{
    id: number
}

export interface Equipment{
    idWeapon: number,
    idShield: number,
    idArmor: number,
    idRoom0: number,
    idRoom1: number,
    idRoom2: number,
    idRoom3: number,
    idRoom4: number,
}

export interface InvetoryItemPlayer{
  id: number;
  cantidad: number
}

export interface PlayerContext{
    id: string 
    name: string,
    imgProfile: string,
    wallet: {
        credits: number
        platino: number
    },
    resources:{
        circuits: number
        cores: number
        metals: number
        crystals: number
    }
    equipment: Equipment,
    inventory: InvetoryItemPlayer[],
    stats: PlayerStats,
}

export interface InvetoryItemPlayer{
  id: number;
  cantidad: number
}

/* Database */

export interface PlayerDatabase {
  actions: number;
  actionsMax: number;
  baseAttack: number;

  bonos: Bones;
  debuf: Debuffs;
  dificultad: number;

  equipment: Equipment

  id: string;
  idTypeImage: number;
  imgProfile: string;

  inventory: InvetoryItemPlayer[];

  life: number;
  lifeMax: number;

  name: string;

  resources: PlayerResourses;
  states: unknown[];
  stats: PlayerStats;
  wallet: Wallet;
}

export interface Wallet{
    credits: number;
    platino: number;
};

export interface Debuffs {
    fire: number;
    fragil: number;
    poison: number;
    slowness: number;
};

export interface Bones {
    actions: number;
    attack: number;
    defense: number;
    luck: number;
};