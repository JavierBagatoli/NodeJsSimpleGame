import { Router } from "express";
import { getPlayer } from "../player/player.service";
import { setInvetory, updateStats } from "./inventory.service";
import { PlayerContext } from "../player/player.interfaces";
import { getIdToken } from "../../globals/player.aux";

const router = Router();

router.get("/equipment", async (req, res) => {
  const playerId = await getIdToken(req)
  if (!playerId) {
    return res.status(501).json({
      error: "Acceso no autorizado"
    });
  }

  const player = await getPlayer(playerId);

  if (!player) {
    return res.status(404).json({
      error: "Jugador no encontrado"
    });
  }

  res.json((player as PlayerContext).equipment );
});



router.get("/inventory", async (req, res) => {
  const playerId = await getIdToken(req)
  if (!playerId) {
    return res.status(501).json({
      error: "Acceso no autorizado"
    });
  }

  const player = await getPlayer(playerId);
  if (!player || "error" in player) {
    return res.status(404).json({
      error: "Jugador no encontrado"
    });
  }

  res.json((player).inventory);
});

router.get("/set/:idSlot/:idInventory", async (req, res) => {
  const playerId = await getIdToken(req)
  if (!playerId) {
    return res.status(501).json({
      error: "Acceso no autorizado"
    });
  }

  console.log(">>>")
  const idSlot = req.params.idSlot;
  const playerIdinventory = Number(req.params.idInventory);

  const player = await getPlayer(playerId);

  if (!player) {
    return res.status(404).json({
      error: "Jugador no encontrado"
    });
  }

  const changes = await setInvetory(playerId, idSlot, playerIdinventory);
  if (!changes || "error" in changes) {
    return res.status(404).json(changes);
  }
  
  res.json(changes);
});

export default router;

//TODO: Agregar visualizacion de equipo ajeno por medio de un header o algo asi los id se mantienen seguros.