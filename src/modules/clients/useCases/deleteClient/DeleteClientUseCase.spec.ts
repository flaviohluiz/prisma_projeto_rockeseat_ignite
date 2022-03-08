import { CreateClientUseCase, ICreateClient } from "../createClient/CreateClientUseCase";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

let createClientUseCase: CreateClientUseCase;
let deleteClientUseCase: DeleteClientUseCase;
let client: ICreateClient;

describe("Delete Client", () => {
    beforeEach(() =>{
        createClientUseCase = new CreateClientUseCase();
        deleteClientUseCase = new DeleteClientUseCase();

        client = {
            username: "deleteClient",
            password: "deleteClient"
        };
    });

    it("should be able to delete a client", async () => {
        
        const clientCreated = await createClientUseCase.execute(client);
        
        const clientDeleted = await deleteClientUseCase.execute(clientCreated.id);
        
        expect(clientDeleted).toBe(true);
    });

});