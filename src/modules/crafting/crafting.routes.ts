import { Router } from "express";
import { dataFakeItemBase } from "../../fakeData/fakeBiblioteca.data";
import { itemToSell } from "./crafting.interfaces";
import { tryBuyItemForPlayer } from "./crafting.service";

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
  const {idUser, idItem} = req.body

  const buyStatus = tryBuyItemForPlayer(idUser, idItem)
  
  if(!buyStatus || "error" in buyStatus){
    return res.status(404).json({
      error: "no se puede comprar"
    });
  }

  res.json(buyStatus);
});

export default router;