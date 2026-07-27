import { Router } from "express";
import { getAuth } from "firebase-admin/auth";
import { getProfile, UpdateProfile } from "./profile.service";

const router = Router();

router.get("/", async (req, res) => {
  const token = (req.headers['authorization'] ?? "").split(" ")[1]

  const decodedToken = await getAuth().verifyIdToken(token);

  if(!token){return res.status(505).json({
    error: "Error auth"
  })}

  const player = await getProfile(decodedToken.uid);

  if (!player) {
    return res.status(500).json({
      error: "Jugador no encontrado"
    });
  }

  res.json(player); // TODO: hay que recortar el objeto
});

router.post("/", async (req, res) => {
  const token = (req.headers['authorization'] ?? "").split(" ")[1]

  const decodedToken = await getAuth().verifyIdToken(token);

  if(!token){return res.status(505).json({
    error: "Error auth"
  })}

  const player = await UpdateProfile(decodedToken.uid, req.body);

  if (!player) {
    return res.status(500).json({
      error: "Jugador no encontrado"
    });
  }

  res.json(player);
});

export default router;