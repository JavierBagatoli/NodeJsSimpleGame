import { Router } from "express";
import { getPlayer, setInvetory } from "./player.service";

const router = Router();

router.get("/:id", async (req, res) => {
  const playerId = Number(req.params.id);

  const player = await getPlayer(playerId);

  if (!player) {
    return res.status(404).json({
      error: "Jugador no encontrado"
    });
  }

  res.json(player);
});


router.get("/:id/stats", async (req, res) => {
  const playerId = Number(req.params.id);

  const player = await getPlayer(playerId);

  if (!player) {
    return res.status(404).json({
      error: "Jugador no encontrado"
    });
  }

  res.json(player.stats);
});

router.get("/set/:idSlot/:idInventory", async (req, res) => {
  const idSlot = req.params.idSlot;
  const playerIdinventory = Number(req.params.idInventory);

  const changes = await setInvetory(1, idSlot, playerIdinventory);

  if (!changes || "error" in changes) {
    return res.status(404).json(changes);
  }

  res.json(changes);
});

export default router;