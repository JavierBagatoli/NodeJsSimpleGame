import { Router } from "express";
import { dataFakeItemBase } from "../../fakeData/fakeBiblioteca.data";
import { itemToSell } from "./crafting.interfaces";
import { tryBuyItemForPlayer } from "./crafting.service";
import { getIdToken } from "../../globals/player.aux";

const router = Router();

router.get("/costs", async (_req, res) => {
  const listOfItems: itemToSell[] = Object.entries(dataFakeItemBase).map(([_key, item]) => {
    return {
      title: item.title,
      description: item.description,
      cost: item.coste,
      id: item.id
    }
  })

  res.json(listOfItems);
});

router.post("/buy", async (req, res) => {
  const playerId = await getIdToken(req)
  if (!playerId) {
    return res.status(501).json({
      error: "Acceso no autorizado"
    });
  }

  const { idItem} = req.body

  const buyStatus = tryBuyItemForPlayer(playerId, idItem)
  
  if(!buyStatus || "error" in buyStatus){
    return res.status(404).json({
      error: "no se puede comprar"
    });
  }

  res.json(buyStatus);
});

export default router;