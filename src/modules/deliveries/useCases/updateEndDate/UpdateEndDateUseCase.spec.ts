import { Clients, Deliveries, Deliveryman } from "@prisma/client";
import { CreateClientUseCase, ICreateClient } from "../../../clients/useCases/createClient/CreateClientUseCase";
import { DeleteClientUseCase } from "../../../clients/useCases/deleteClient/DeleteClientUseCase";
import { CreateDeliverymanUseCase, ICreateDeliveryman } from "../../../deliveryman/useCases/createDeliveryman/CreateDeliverymanUseCase";
import { DeleteDeliverymanUseCase } from "../../../deliveryman/useCases/deleteDeliveryman/DeleteDeliverymanUseCase";
import { CreateDeliveryUseCase } from "../createDeliveries/CreateDeliveryUseCase";
import { DeleteDeliveryUseCase } from "../deleteDeliveries/DeleteDeliveryUseCase";
import { UpdateDeliverymanUseCase } from "../updateDeliveryman/useCases/UpdateDeliverymanUseCase";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";

let updateEndDateUseCase: UpdateEndDateUseCase;
let updateDeliverymanUseCase: UpdateDeliverymanUseCase;
let createClientUseCase: CreateClientUseCase;
let deleteClientUseCase: DeleteClientUseCase;
let createDeliverymanUseCase: CreateDeliverymanUseCase;
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase;
let createDeliveryUseCase: CreateDeliveryUseCase;
let deleteDeliveryUseCase: DeleteDeliveryUseCase;
let firstClient: ICreateClient;
let secondClient: ICreateClient;
let firstClientCreated: Clients;
let secondClientCreated: Clients;
let firstDeliveryman: ICreateDeliveryman;
let secondDeliveryman: ICreateDeliveryman;
let firstDeliverymanCreated: Deliveryman;
let secondDeliverymanCreated: Deliveryman;

let deliveryCreated: Deliveries;

describe("Update End Date", () => {
    
    beforeEach(() => {
        updateEndDateUseCase = new UpdateEndDateUseCase();
        updateDeliverymanUseCase = new UpdateDeliverymanUseCase();
        createClientUseCase = new CreateClientUseCase();
        createDeliverymanUseCase = new CreateDeliverymanUseCase();
        createDeliveryUseCase = new CreateDeliveryUseCase();
        deleteDeliverymanUseCase = new DeleteDeliverymanUseCase();
        deleteDeliveryUseCase = new DeleteDeliveryUseCase();
        deleteClientUseCase = new DeleteClientUseCase();         

        firstClient = {
            username: "updateEndDateFirstClient",
            password: "updateEndDateFirstClient",
        };

        secondClient = {
            username: "updateEndDateSecondClient",
            password: "updateEndDateSecondClient",
        };

        firstDeliveryman = {
            username: "updateEndDateFirstDeliveryman",
            password: "updateEndDateFirstDeliveryman",
        };

        secondDeliveryman = {
            username: "updateEndDateSecondDeliveryman",
            password: "updateEndDateSecondDeliveryman",
        };
    });
    
    it("should be able to update end date on delivery", async () => {
        firstClientCreated = await createClientUseCase.execute(firstClient);

        firstDeliverymanCreated = await createDeliverymanUseCase.execute(firstDeliveryman);
        
        deliveryCreated = await createDeliveryUseCase.execute({
            item_name: "updateFirstDeliverymanDelivery",
            id_client: firstClientCreated.id,
        });

        await updateDeliverymanUseCase.execute({
            id_delivery: deliveryCreated.id,
            id_deliveryman: firstDeliverymanCreated.id,
        });

        const updateEndDate = await updateEndDateUseCase.execute({
            id_delivery: deliveryCreated.id,
            id_deliveryman: firstDeliverymanCreated.id,
        });
        
        expect(updateEndDate).toStrictEqual({"count":1});
        
        await deleteDeliveryUseCase.execute(deliveryCreated.id);
        await deleteClientUseCase.execute(firstClientCreated.id);
        await deleteDeliverymanUseCase.execute(firstDeliverymanCreated.id);
        
    });

    it("should not be able to update end date whithout a id_deliveryman on delivery", async () => {
        secondClientCreated = await createClientUseCase.execute(secondClient);

        secondDeliverymanCreated = await createDeliverymanUseCase.execute(secondDeliveryman);
        
        const deliveryCreated = await createDeliveryUseCase.execute({
            item_name: "updateSecondDeliverymanDelivery",
            id_client: secondClientCreated.id,
        });

        const updateEndDate = await updateEndDateUseCase.execute({
            id_delivery: deliveryCreated.id,
            id_deliveryman: secondDeliverymanCreated.id,
        });
        
        expect(updateEndDate).toStrictEqual({"count":0})
        
        await deleteDeliveryUseCase.execute(deliveryCreated.id);
        await deleteClientUseCase.execute(secondClientCreated.id);
        await deleteDeliverymanUseCase.execute(secondDeliverymanCreated.id);         
    });    
});