import { Clients } from "@prisma/client";
import { CreateClientUseCase, ICreateClient} from "../../clients/useCases/createClient/CreateClientUseCase";
import { DeleteClientUseCase } from "../../clients/useCases/deleteClient/DeleteClientUseCase";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

let createClientUseCase: CreateClientUseCase;
let authenticateClientUseCase: AuthenticateClientUseCase;
let deleteClientUseCase: DeleteClientUseCase;
let client: ICreateClient;
let clientCreated: Clients;

describe("Authenticate Client", () => {
    
    beforeEach(() => {
        authenticateClientUseCase = new AuthenticateClientUseCase();
        createClientUseCase = new CreateClientUseCase();
        deleteClientUseCase = new DeleteClientUseCase();
        
        client = {
            username: "authenticateClient",
            password: "authenticateClient",
        }
    });
    
    it("should be able to authenticate a client", async () => {
        
        // const client = {
        //     username: "AuthenticateClient",
        //     password: "AuthenticateClient",
        // }

        clientCreated = await createClientUseCase.execute(client);

        //const clientCreated = await createClientUseCase.execute(client);        

        const clientAuthenticate = await authenticateClientUseCase.execute({
            username: client.username,
            password: client.password,
        });

        expect(clientAuthenticate).toHaveProperty("token");        

        //await deleteClientUseCase.execute(clientCreated.id);
    });

    it("should not be able to authenticate an nonexistent client", () => {
        expect(async () => {
            await authenticateClientUseCase.execute({
                username: "falseClient",
                password: "falseClient",
            });
        }).rejects.toBeInstanceOf(Error);
    });

    it("should not be able to authenticate a client with incorrect password", () => {
        expect(async () => {
            // const client = {
            //     username: "AuthenticateClient",
            //     password: "incorrectPassword",
            // };

            await authenticateClientUseCase.execute({
                username: client.username,
                password: "incorrectPassword",
            })
        }).rejects.toBeInstanceOf(Error);
    });

    afterAll(() => {
        deleteClientUseCase.execute(clientCreated.id);
    });
});

