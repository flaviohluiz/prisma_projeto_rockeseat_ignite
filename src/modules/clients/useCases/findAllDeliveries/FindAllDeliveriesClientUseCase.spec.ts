import { Clients } from "@prisma/client";
import { CreateClientUseCase, ICreateClient } from "../createClient/CreateClientUseCase";
import { DeleteClientUseCase } from "../deleteClient/DeleteClientUseCase";
import { FindAllDeliveriesClientUseCase } from "./FindAllDeliveriesClientUseCase";

let createClientUseCase: CreateClientUseCase;
let findAllDeliveriesUseCase: FindAllDeliveriesClientUseCase;
let deleteClientUseCase: DeleteClientUseCase;
let client: ICreateClient
let clientCreated: Clients

describe("Find All Client Deliveries", () => {
    beforeEach(() => {
        createClientUseCase = new CreateClientUseCase();
        findAllDeliveriesUseCase = new FindAllDeliveriesClientUseCase();
        deleteClientUseCase = new DeleteClientUseCase();

        client = {
            username: "FindAllDeliveries",
            password: "FindAllDeliveries", 
        };

    });

    it("should be able to show all client deliveries", async () => {
        clientCreated = await createClientUseCase.execute(client);

        const findAllDeliveries = await findAllDeliveriesUseCase.execute(clientCreated.id);

        console.log(typeof(findAllDeliveries));

        //expect(findAllDeliveries);
    });

    afterAll(async () => {
        await deleteClientUseCase.execute(clientCreated.id);
    });
});