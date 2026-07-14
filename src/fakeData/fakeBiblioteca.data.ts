export interface Item {
  id: number;
  title: string;
  description: string;
  type: 'weapon' | 'armor' | 'shield' | 'room';
  damage: number,
  buff: {type: 'slow' | 'poison' | 'fire' | 'fragil', prop: number, damage: number}[]
}

export const dataFakeItemBase: Record<number, Item> = {
  1: {
    id: 1,
    title: "Arma",
    description: "...",
    type: 'weapon',
    damage: 1,
    buff: [],
  },
  2: {
    id: 2,
    title: "Armadura",
    description: "...",
    type: 'armor',
    damage: 0,
    buff: [],
  },
  3: {
    id: 3,
    title: "escudo",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
  },
  4: {
    id: 4,
    title: "habiacion",
    description: "...",
    type: 'weapon',
    damage: 0,
    buff: [],
  },
  5: {
    id: 5,
    title: "habiacion 2",
    description: "...",
    type: 'armor',
    damage: 0,
    buff: [],
  },
  6: {
    id: 6,
    title: "habiacion 3",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
  },
  50:{
    id:50,
    title: "Espada de frio",
    description: "congela al enemigo",
    type: 'weapon',
    damage: 2,
    buff: [{
      type: 'slow',
      prop: 33,
      damage: 0}
    ],
  }
};