import { Router } from "express";
import { getPlayer, refreshById } from "./player.service";
import { getAuth } from "firebase-admin/auth";

const router = Router();

router.get("/", async (req, res) => {
  const token = (req.headers['authorization'] ?? "").split(" ")[1]

  const decodedToken = await getAuth().verifyIdToken(token);

  if(!token){return res.status(505).json({
    error: "Error auth"
  })}

  const player = await getPlayer(decodedToken.uid);

  if (!player) {
    return res.status(500).json({
      error: "Jugador no encontrado"
    });
  }

  res.json(player);
});

router.get("/refresh", async (req, res) => {
  const token = (req.headers['authorization'] ?? "").split(" ")[1]

  const decodedToken = await getAuth().verifyIdToken(token);

  if(!token){return res.status(505).json({
    error: "Error auth"
  })}

  const player = await refreshById(decodedToken.uid);

  if (!player) {
    return res.status(500).json({
      error: "Jugador no encontrado"
    });
  }

  res.json(player);
});

router.get("/:id", async (req, res) => {
  const playerId = req.params.id;

  const player = await getPlayer(playerId);

  if (!player) {
    return res.status(500).json({
      error: "Jugador no encontrado"
    });
  }

  res.json(player);
});


router.get("/:id/stats", async (req, res) => {
  const playerId = req.params.id;

  const player = await getPlayer(playerId);

  if (!player || "error" in player) {
    return res.status(404).json({
      error: "Jugador no encontrado"
    });
  }

  res.json((player as any).stats);
});

export default router;