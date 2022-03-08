import { Clients, Deliveryman } from "@prisma/client";
import { CreateClientUseCase, ICreateClient } from "../../../../clients/useCases/createClient/CreateClientUseCase";
import { DeleteClientUseCase } from "../../../../clients/useCases/deleteClient/DeleteClientUseCase";
import { CreateDeliverymanUseCase, ICreateDeliveryman } from "../../../../deliveryman/useCases/createDeliveryman/CreateDeliverymanUseCase";
import { DeleteDeliverymanUseCase } from "../../../../deliveryman/useCases/deleteDeliveryman/DeleteDeliverymanUseCase";
import { CreateDeliveryUseCase } from "../../createDeliveries/CreateDeliveryUseCase";
import { DeleteDeliveryUseCase } from "../../deleteDeliveries/DeleteDeliveryUseCase";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

let updateDeliverymanUseCase: UpdateDeliverymanUseCase;
let createClientUseCase: CreateClientUseCase;
let deleteClientUseCase: DeleteClientUseCase;
let createDeliverymanUseCase: CreateDeliverymanUseCase;
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase;
let createDeliveryUseCase: CreateDeliveryUseCase;
let deleteDeliveryUseCase: DeleteDeliveryUseCase;
let client: ICreateClient
let clientCreated: Clients;
let deliveryman: ICreateDeliveryman;
let deliverymanCreated: Deliveryman;


describe("Update Deliveryman", () => {
    
    beforeEach(() => {
        
        createClientUseCase = new CreateClientUseCase();
        createDeliverymanUseCase = new CreateDeliverymanUseCase();
        createDeliveryUseCase = new CreateDeliveryUseCase();        
        updateDeliverymanUseCase = new UpdateDeliverymanUseCase();
        deleteDeliveryUseCase = new DeleteDeliveryUseCase();
        

        client = {
            username: "updateDeliverymanClient",
            password: "updateDeliverymanClient",
        };

        deliveryman = {
            username: "updateDeliveryman",
            password: "updateDeliveryman",
        };
    });
    
    it("should be able to update deliveryman on delivery", async () => {
        clientCreated = await createClientUseCase.execute(client);

        deliverymanCreated = await createDeliverymanUseCase.execute(deliveryman);
        
        const deliveryCreated = await createDeliveryUseCase.execute({
            item_name: "updateDeliverymanDelivery",
            id_client: clientCreated.id,
        });

        const updateDelivery = await updateDeliverymanUseCase.execute({
            id_delivery: deliveryCreated.id,
            id_deliveryman: deliverymanCreated.id,
        });

        expect(updateDelivery).toHaveProperty("id_deliveryman")

        await deleteDeliveryUseCase.execute(deliveryCreated.id);
    });

    afterAll(async () => {      
        deleteClientUseCase = new DeleteClientUseCase();
        deleteDeliverymanUseCase = new DeleteDeliverymanUseCase();

        await deleteClientUseCase.execute(clientCreated.id); 
        await deleteDeliverymanUseCase.execute(deliverymanCreated.id);       
        
    });
});