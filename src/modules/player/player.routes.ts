import { Router } from "express";
import { getPlayer } from "./player.service";

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

export default router;