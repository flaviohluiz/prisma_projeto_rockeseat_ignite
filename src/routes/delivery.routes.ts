import { Router } from "express";
import { ensureAuthenticateClient } from "../middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "../middlewares/ensureAuthenticateDeliveryman";
import { createDeliveryController } from "../modules/deliveries/useCases/createDeliveries";
import { deleteDeliveryController } from "../modules/deliveries/useCases/deleteDeliveries";
import { findAllAvailableController } from "../modules/deliveries/useCases/findAllAvailable";
import { updateDeliverymancontroller } from "../modules/deliveries/useCases/updateDeliveryman/useCases";
import { updateEndDateController } from "../modules/deliveries/useCases/updateEndDate";


const deliveryRoutes = Router();

deliveryRoutes.post("/", ensureAuthenticateClient, createDeliveryController.handle);
deliveryRoutes.get("/available",ensureAuthenticateDeliveryman, findAllAvailableController.handle);
deliveryRoutes.put("/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymancontroller.handle);
deliveryRoutes.put("/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle);

deliveryRoutes.delete("/deleteDelivery/:id", deleteDeliveryController.handle);

export {deliveryRoutes}