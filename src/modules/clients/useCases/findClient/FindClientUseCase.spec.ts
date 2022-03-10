import { Clients } from "@prisma/client";
import { CreateClientUseCase, ICreateClient } from "../createClient/CreateClientUseCase";
import { DeleteClientUseCase } from "../deleteClient/DeleteClientUseCase";
import { FindClientUseCase } from "./FindClientUseCase";

let createClientUseCase: CreateClientUseCase;
let client: ICreateClient;
let clientCreated: Clients;
let deleteClientUseCase: DeleteClientUseCase;
let findClientUseCase: FindClientUseCase;

describe("Find Client", () => {

    beforeEach(() => {
        
        createClientUseCase = new CreateClientUseCase();

        findClientUseCase = new FindClientUseCase();

        client = {
            username: "findClient",
            password: "findClient",
        }
    });

    it("should be able to find a client", async () => {
        clientCreated = await createClientUseCase.execute(client);

        const findClient = await findClientUseCase.execute(clientCreated.username);

        expect(findClient).toEqual({username: clientCreated.username, id: clientCreated.id});

    });

    afterAll(async () => {
        deleteClientUseCase = new DeleteClientUseCase();
        await deleteClientUseCase.execute(clientCreated.id);
    });

});