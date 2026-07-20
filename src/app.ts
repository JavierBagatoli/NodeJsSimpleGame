import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import capitalShipRoutes from "./modules/capitalShip/capitalShip.routes";
import playerRoutes from "./modules/player/player.routes";
import dungeonRoutes from "./modules/dungeon/dungeon.routes";
import inventoryRoutes from "./modules/inventory/inventory.routes";
import craftingRoutes from "./modules/crafting/crafting.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "Backend funcionando"
  });
});

app.use("/api/capitalShip", capitalShipRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/dungeon", dungeonRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/crafting", craftingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});