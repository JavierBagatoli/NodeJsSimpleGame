import { Router } from "express";
import { changeCapitalShip, getPlayerCapitalShip } from "./capitalShip.service";

const router = Router();

router.get("/:id", async (req, res) => {
  const capitalShipId = Number(req.params.id);

  const capitalShip = await getPlayerCapitalShip(capitalShipId);

  if (!capitalShip) {
    return res.status(404).json({
      error: "capitalShipa no encontrado"
    });
  }

  res.json(capitalShip);
});

router.get("/:id/move/:idZone", async (req, res) => {
  const capitalShipId = Number(req.params.id);
  const idZone = Number(req.params.idZone);

  const capitalShip = await changeCapitalShip(1,capitalShipId, idZone);

  if (!capitalShip) {
    return res.status(404).json({
      error: "capitalShipa no encontrado"
    });
  }

  res.json(capitalShip);
});

export default router;