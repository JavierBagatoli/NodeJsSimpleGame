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
    title: "Guanteletes",
    description: "Creados con los restos de ***, potencian los puños que dados y mitigan un poco de daño",
    type: 'weapon',
    damage: 1,
    buff: [],
    actions: 0,
    defense: 1,
    coste:{
      metal: 0,
    }
  },
  1: {
    id: 1,
    title: "Espada corta",
    description: "parece (pero no es) un cuchillo de cocina (juro que no lo es)",
    type: 'weapon',
    damage: 2,
    buff: [],
    actions: 0,
    defense: 0,
    coste:{
      metal: 3,
    }
  },
  2: {
    id: 2,
    title: "Pechera simple",
    description: "Restos metalicos que tiene la vaga forma de un torso, protege el pecho y abdomen de algunos golpes",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 2,
    coste:{
      metal: 3,
    }
  },
  3: {
    id: 3,
    title: "Grebas simples",
    description: "Montones de chapas metalicas atadas para proteger el daño de las piernas",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 1,
    coste:{
      metal: 2,
    }
  },
  4: {
    id: 4,
    title: "Espada larga",
    description: "espada grande y desgastada, general un gran daño pero es muy pesada",
    type: 'weapon',
    damage: 3,
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
    title: "Armadura (amalgama)",
    description: "Fundiendo las partes de pechera simple y grebas simple creas una armadura que cubre tu torso",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 4,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  6: {
    id: 6,
    title: "Arco casero",
    description: "un arco creado con pocas ramas e hilo, sus flehas son simples ramas talladas",
    type: 'weapon',
    damage: 2,
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
    title: "Jabalina(amalgama)",
    description: "baston con una espada simple atada en la punta, ataca a media distancia y puede ser lanzado",
    type: 'weapon',
    damage: 2-3,
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
    title: "Casco",
    description: "con el conocimiento adquirido de forjar una armadura ahora puedes crear un casco que te protega de daño letal",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 1,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  9: {
    id: 9,
    title: "Botas",
    description: "con el conocimiento adquirido de forjar una armadura ahora puedes crear unas botas que protejan tus pies",
    type: 'armor',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 1,
    coste:{
      cristal: 1,
      metal: 15,
    }
  },
  10: {
    id: 10,
    title: "Guanteletes reforzados",
    description: "mejoras tu arma inical poniendole proteccion en los antebrazos, espinas en los nudillos y un lindo color",
    type: 'weapon',
    damage: 2,
    buff: [],
    actions: 0,
    defense: 3,
    coste:{
      cristal: 1,
      metal: 13,
    }
  },
  11: {
    id: 11,
    title: "Arco compuesto",
    description: "habiendo dominado el uso del arco consigues esta mejora que requiere menos fuerza para tensarlo y recorre mas distancia",
    type: 'weapon',
    damage: 3,
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
    title: "Escudo reforzado pequeño",
    description: "...",
    type: 'shield',
    damage: 0,
    buff: [],
    actions: 0,
    defense: 4,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id:50,
    title: "Espada de frio",
    description: "congela al enemigo",
    type: 'weapon',
    damage: 2,
    actions: 0,
    defense: 0,
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