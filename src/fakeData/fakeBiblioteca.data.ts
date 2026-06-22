export interface Item {
  id: number;
  title: string;
  description: string;
  type: 'weapon' | 'armor' | 'shield' | 'room';
}

export const dataFakeItemBase: Record<number, Item> = {
  1: {
    id: 1,
    title: "Arma",
    description: "...",
    type: 'weapon',
  },
  2: {
    id: 2,
    title: "Armadura",
    description: "...",
    type: 'armor',
  },
  3: {
    id: 3,
    title: "escudo",
    description: "...",
    type: 'shield',
  },
  4: {
    id: 4,
    title: "habiacion",
    description: "...",
    type: 'weapon',
  },
  5: {
    id: 5,
    title: "habiacion 2",
    description: "...",
    type: 'armor',
  },
  6: {
    id: 6,
    title: "habiacion 3",
    description: "...",
    type: 'shield',
  },
};