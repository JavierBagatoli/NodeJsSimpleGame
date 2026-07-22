export interface Item {
  id: number;
  title: string;
  description: string;
  type: 'weapon' | 'armor' | 'shield' | 'room';
  damage: number,
  defense: number,
  actions: number,
  buff: BuffItem[],
  coste: ItemCost,
}

export interface ItemCost {
  circuito?: number,
  nucleo?: number,
  metal?: number,
  cristal?: number
}

export interface BuffItem {
  type: 'slow' | 'poison' | 'fire' | 'fragil',
  prop: number,
  damage: number
}

export const dataFakeItemBase: Record<number, Item> = {
  0: {
    id: 0,
    title: "guantes",
    description: "...",
    type: 'weapon',
    damage: 1,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      metal: 0,
    }
  },
  1: {
    id: 1,
    title: "Arma",
    description: "...",
    type: 'weapon',
    damage: 1,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      metal: 3,
    }
  },
  2: {
    id: 2,
    title: "Armadura",
    description: "...",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      metal: 3,
    }
  },
  3: {
    id: 3,
    title: "escudo",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      metal: 5,
    }
  },
  4: {
    id: 4,
    title: "Arma compuesta",
    description: "...",
    type: 'weapon',
    damage: 1,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  5: {
    id: 5,
    title: "Armadura compuesta",
    description: "...",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  6: {
    id: 6,
    title: "escudo compuesta",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 15,
    }
  },
  7: {
    id: 7,
    title: "Arma v3",
    description: "...",
    type: 'weapon',
    damage: 1,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  8: {
    id: 8,
    title: "Armadura v3",
    description: "...",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  9: {
    id: 9,
    title: "escudo v3",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 15,
    }
  },
  10: {
    id: 10,
    title: "Arma v4",
    description: "...",
    type: 'weapon',
    damage: 1,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  11: {
    id: 11,
    title: "Armadura v4",
    description: "...",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  12: {
    id: 12,
    title: "escudo v4",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 15,
    }
  },
  13: {
    id: 13,
    title: "Arma v5",
    description: "...",
    type: 'weapon',
    damage: 1,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  14: {
    id: 14,
    title: "Armadura v5",
    description: "...",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  16: {
    id: 16,
    title: "escudo v5",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 15,
    }
  },
  17: {
    id: 17,
    title: "Arma v6",
    description: "...",
    type: 'weapon',
    damage: 1,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  18: {
    id: 18,
    title: "Armadura v6",
    description: "...",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  19: {
    id: 19,
    title: "escudo v6",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 15,
    }
  },
  20: {
    id: 20,
    title: "Arma v7",
    description: "...",
    type: 'weapon',
    damage: 1,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  21: {
    id: 21,
    title: "Armadura v7",
    description: "...",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  22: {
    id: 22,
    title: "escudo v7",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      cristal: 1,
      metal: 15,
      nucleo: 2,
      circuito:3,
    }
  },
  50: {
    id: 50,
    title: "habiacion",
    description: "...",
    type: 'weapon',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      metal: 0,
    },
  },
  51: {
    id: 51,
    title: "habiacion 2",
    description: "...",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      metal: 0,
    },
  },
  52: {
    id: 52,
    title: "habiacion 3",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      metal: 0,
    },
  },
  53:{
    id:53,
    title: "Espada de frio",
    description: "congela al enemigo",
    type: 'weapon',
    damage: 2,
    defense: 0,
    actions: 0,
    buff: [{
      type: 'slow',
      prop: 33,
      damage: 0}
    ],
    coste:{
      metal: 0,
    },
  }
};