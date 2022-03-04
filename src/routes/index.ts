import { Router } from "express";
import { clientRoutes } from "./client.routes";
import { deliveryRoutes } from "./delivery.routes";
import { deliverymanRoutes } from "./deliveryman.routes";


const routes = Router();

routes.use("/client", clientRoutes);
routes.use("/deliveryman", deliverymanRoutes);
routes.use("/delivery", deliveryRoutes);

export {routes};