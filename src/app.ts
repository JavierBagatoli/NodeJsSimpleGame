import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import capitalShipRoutes from "./modules/capitalShip/capitalShip.routes.ts";
import playerRoutes from "./modules/player/player.routes.ts";
import dungeonRoutes from "./modules/dungeon/dungeon.routes.ts";
import inventoryRoutes from "./modules/inventory/inventory.routes.ts";
import craftingRoutes from "./modules/crafting/crafting.routes.ts";
import profileRoutes from "./modules/profile/profile.routes.ts";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

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
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});