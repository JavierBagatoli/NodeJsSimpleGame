export interface CapitalShip {
  id: number;
  name: string;
  government: string;
}

const listCapitalShips = [
  {
    id: 1,
    name: "Terra Nova",
    government: "Republic",
  },
  {
    id: 2,
    name: "Zarkon Prime",
    government: "Empire",
  },
  {
    id: 3,
    name: "Aetheria",
    government: "Federation",
  },
];

export interface player {
    id: 1,
    username: "Player1",
    capitalShipId: 1,
  }

const players = [
  {
    id: 1,
    username: "Player1",
    capitalShipId: 1,
  },
];

export async function getPlayerCapitalShip(userId: number) {
  const player = players.find(
    (p) => p.id === userId
  );

  if (!player) {
    throw new Error("Jugador no encontrado");
  }

  const capitalShip: CapitalShip | undefined = listCapitalShips.find(
    (p) => p.id === player.capitalShipId
  );

  if(!capitalShip){
    throw new Error("No tiene nave capital");
  }

  return capitalShip;
}

export async function changeCapitalShip(userId: number, capitalShipId: number) {
  const player = players.find(
    (p) => p.id === userId
  );

  if (!player) {
    throw new Error("Jugador no encontrado");
  }

  const capitalShip = listCapitalShips.find(
    (p) => p.id === capitalShipId
  );

  if (!capitalShip) {
    throw new Error("capitalShipa no existe");
  }

  player.capitalShipId = capitalShipId;

  return {
    success: true,
    message: `Ahora perteneces a ${capitalShip.name}`,
    capitalShip,
  };
}