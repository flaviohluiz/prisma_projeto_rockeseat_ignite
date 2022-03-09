import { Clients } from "@prisma/client";
import { CreateClientUseCase, ICreateClient } from "../../../clients/useCases/createClient/CreateClientUseCase";
import { DeleteClientUseCase } from "../../../clients/useCases/deleteClient/DeleteClientUseCase";
import { CreateDeliveryUseCase } from "../createDeliveries/CreateDeliveryUseCase";
import { DeleteDeliveryUseCase } from "./DeleteDeliveryUseCase";

let createClientUseCase: CreateClientUseCase;
let client: ICreateClient;
let clientCreated: Clients;
let deleteClientUseCase: DeleteClientUseCase;
let createDeliveryUseCase: CreateDeliveryUseCase;
let deleteDeliveryUseCase: DeleteDeliveryUseCase;

describe("Delete Delivery", () => {

    beforeEach(() => {
        
        createClientUseCase = new CreateClientUseCase();
        createDeliveryUseCase = new CreateDeliveryUseCase();
        deleteDeliveryUseCase = new DeleteDeliveryUseCase();
        
        client ={
            username: "deleteDeliveryClient",
            password: "deleteDeliveryClient",
        };

    });

    it("should be able to delete a delivery", async () => {
        clientCreated = await createClientUseCase.execute(client);

        const deliveryCreated = await createDeliveryUseCase.execute({
            item_name: "deleteDelivery",
            id_client: clientCreated.id,
        });

        const deliveryDeleted = await deleteDeliveryUseCase.execute(deliveryCreated.id)

        expect(deliveryDeleted).toEqual({
            id: deliveryCreated.id,
            id_client: clientCreated.id,
            id_deliveryman: null,
            item_name: deliveryCreated.item_name,
            created_at: deliveryCreated.created_at,
            end_at: null,
        });

    });

    afterAll(async () =>{
        deleteClientUseCase = new DeleteClientUseCase();
        await deleteClientUseCase.execute(clientCreated.id);
    });

});