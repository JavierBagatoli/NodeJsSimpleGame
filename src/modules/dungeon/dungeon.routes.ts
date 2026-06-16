import { Router } from "express";
import { getCreateEnemy, getListOfDungeonsAvalibles, getEndTurn } from "./dungeon.service";

const router = Router();

router.post("/list-dungeons", async (req, res ) => {
  const { idUser } = req?.body;

  const list = await getListOfDungeonsAvalibles(idUser);

  if (!list) {
    return res.status(404).json({
      error: "Jugador no encontrado"
    });
  }

  res.status(200).json(list);
});

router.post("/create-monster", async (req, res ) => {
  const { idUser, level } = req.body;

  const monster = await getCreateEnemy(idUser, level);



  res.json(monster);
});

router.post("/end-turn", async (req, res ) => {
  const { idUser, actions } = req.body;

  const list = await getEndTurn(idUser, actions);

  if (!list) {
    return res.status(404).json({
      error: "Jugador no encontrado"
    });
  }else if(list === 1){
    return res.status(404).json({
      error: "Acciones incorrectas"
    });
  }else if(list === 2){
    return res.status(404).json({
      error: "Sin enemigo"
    });
  }


  res.json(list);
});

export default router;


/*
  list dungeons -> return [1, 2] (desbloqueadas)
  create dungeon -> return monster and stats
  dugeon/endTurn (['attack, defense, end']) -> calcular ->  [vida, efectos, drops]
  endDungeon -> bloquear dungeon de hoy.
*/