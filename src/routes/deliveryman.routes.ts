import { Router } from "express";
import { ensureAuthenticateDeliveryman } from "../middlewares/ensureAuthenticateDeliveryman";
import { authenticateDeliverymanController } from "../modules/account/authenticateDeliveryman";
import { createDeliverymanController } from "../modules/deliveryman/useCases/createDeliveryman";
import { deleteDeliverymanController } from "../modules/deliveryman/useCases/deleteDeliveryman";
import { findAllDeliveriesDeliveryman } from "../modules/deliveryman/useCases/findAllDeliveries";

const deliverymanRoutes = Router();

deliverymanRoutes.post("/", createDeliverymanController.handle);
deliverymanRoutes.post("/authenticate", authenticateDeliverymanController.handle);
deliverymanRoutes.get("/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesDeliveryman.handle);

deliverymanRoutes.delete("/deleteDeliveryman/:id", deleteDeliverymanController.handle);

export {deliverymanRoutes}