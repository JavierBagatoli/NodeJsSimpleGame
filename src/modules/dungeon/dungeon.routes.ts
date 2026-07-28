import { Router } from "express";
import { getCreateEnemy, getListOfDungeonsAvalibles, getEndTurn } from "./dungeon.service";
import { ErrorFindData } from "../../globals/error.interface";
import { verifyFirebaseToken } from "../auth/auth.midlleware";
import { getIdToken } from "../../globals/player.aux";

const router = Router();

router.get("/list-dungeons",verifyFirebaseToken, async (req, res ) => {
  const playerId = await getIdToken(req)
  if (!playerId) {
    return res.status(501).json({
      error: "Acceso no autorizado"
    });
  }

  const list : number[] | ErrorFindData = await getListOfDungeonsAvalibles(playerId);

  if (!list || "error" in list) {
    return res.status(404).json({
      error: list.error
    });
  }

  res.status(200).json(list);
});

router.post("/create-monster", async (req, res ) => {
  const playerId = await getIdToken(req)
  if (!playerId) {
    return res.status(501).json({
      error: "Acceso no autorizado"
    });
  }

  const { level } = req.body;
  const monster = await getCreateEnemy(playerId, level);
  res.json(monster);
});

router.post("/end-turn", async (req, res ) => {
  const playerId = await getIdToken(req)
  if (!playerId) {
    return res.status(501).json({
      error: "Acceso no autorizado"
    });
  }
  const { actions } = req.body;

  const list = await getEndTurn(playerId, actions);

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
  }/*else if(list === 3){
    return res.status(404).json({
      error: "Has Muerto"
    });
  }//else if(list === 4){
  //  return res.status(404).json({
  //    error: "Solo puede jugar una dungeon al dia"
  //  });
  //}

*/
  res.json(list);
});

export default router;


/*
  list dungeons -> return [1, 2] (desbloqueadas)
  create dungeon -> return monster and stats
  dugeon/endTurn (['attack, defense, end']) -> calcular ->  [vida, efectos, drops]
  endDungeon -> bloquear dungeon de hoy.
*/