import { Clients, Deliveries } from "@prisma/client";
import { CreateClientUseCase, ICreateClient } from "../../../clients/useCases/createClient/CreateClientUseCase";
import { DeleteClientUseCase } from "../../../clients/useCases/deleteClient/DeleteClientUseCase";
import { DeleteDeliveryUseCase } from "../deleteDeliveries/DeleteDeliveryUseCase";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";


let createDeliveryUseCase: CreateDeliveryUseCase;
let createClientUseCase: CreateClientUseCase;
let deleteClientUseCase: DeleteClientUseCase;
let deleteDeliveryUseCase:  DeleteDeliveryUseCase;
let client: ICreateClient;
let clientCreated: Clients;
let deliveryCreated: Deliveries;

describe("Create Delivery", () => {

    beforeEach(() => {
        createDeliveryUseCase = new CreateDeliveryUseCase();
        createClientUseCase = new CreateClientUseCase();
        deleteClientUseCase = new DeleteClientUseCase();
        deleteDeliveryUseCase = new DeleteDeliveryUseCase();
        client = {
            username: "createDelivery",
            password: "createDelivery",
        };
    });
    
    it("should be able to create a delivery", async () => {
        
        clientCreated = await createClientUseCase.execute(client);
        
        deliveryCreated = await createDeliveryUseCase.execute({
            item_name: "deliveryTest",
            id_client: clientCreated.id,
        });       

        expect(deliveryCreated).toHaveProperty("id");
    });

    afterAll(async () => {
        await deleteDeliveryUseCase.execute(deliveryCreated.id);
        await deleteClientUseCase.execute(clientCreated.id);
    });

});