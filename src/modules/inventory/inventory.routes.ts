import { Router } from "express";
import { getPlayer } from "../player/player.service";
import { setInvetory, updateStats } from "./inventory.service";

const router = Router();

router.get("/:id", async (req, res) => {
  const playerId = Number(req.params.id);

  const player = await getPlayer(playerId);

  if (!player) {
    return res.status(404).json({
      error: "Jugador no encontrado"
    });
  }

  res.json(player.equipment);
});

router.get("/:id/inventory", async (req, res) => {
  const playerId = Number(req.params.id);

  const player = await getPlayer(playerId);

  if (!player) {
    return res.status(404).json({
      error: "Jugador no encontrado"
    });
  }

  res.json(player.invetory);
});

router.get("/:id/set/:idSlot/:idInventory", async (req, res) => {
  const playerId = Number(req.params.id);
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
  updateStats(player)
  
  res.json(changes);
});

export default router;