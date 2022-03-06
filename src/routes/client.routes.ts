import { Router } from "express";
import { ensureAuthenticateClient } from "../middlewares/ensureAuthenticateClient";
import { authenticateClientController } from "../modules/account/authenticateClient";
import { createClientController } from "../modules/clients/useCases/createClient";
import { findAllDeliveriesClient } from "../modules/clients/useCases/findAllDeliveries";
import { deleteClientController } from "../modules/clients/useCases/deleteClient";

const clientRoutes = Router();

clientRoutes.post("/", createClientController.handle);
clientRoutes.post("/authenticate", authenticateClientController.handle);
clientRoutes.get("/deliveries", ensureAuthenticateClient, findAllDeliveriesClient.handle);

clientRoutes.delete("/deleteClient/:id", deleteClientController.handle);

export {clientRoutes};
