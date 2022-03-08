import { Clients } from "@prisma/client";
import { DeleteClientUseCase } from "../deleteClient/DeleteClientUseCase";
import { CreateClientUseCase, ICreateClient } from "./CreateClientUseCase";

let createClientUseCase: CreateClientUseCase;
let deleteClientUseCase: DeleteClientUseCase; 
let client: ICreateClient;
let clientCreated: Clients;

describe("Create Client", () => {
    
    beforeEach(() => {
        createClientUseCase = new CreateClientUseCase();
        
        client = {
            username: "createClient",
            password: "createClient"
        };    
    });

    it("should be able to create a client", async () => {
        
        clientCreated = await createClientUseCase.execute(client);
        
        //const clientCreated = await createClientUseCase.execute(client);                     

        expect(clientCreated).toHaveProperty("id");       
        
        //await deleteClientUseCase.execute(clientCreated.id);
    });    

    it("should not be able to create an existing client", async () => {    
        
        expect(async () => {               
            
            await createClientUseCase.execute(client);

            // await createClientUseCase.execute({
            //     username: "TesteClienteTeste",
            //     password: "TesteClienteTeste"
            // });
        }).rejects.toBeInstanceOf(Error);        
        
    });

    afterAll(async () => {       
        deleteClientUseCase = new DeleteClientUseCase();
        await deleteClientUseCase.execute(clientCreated.id);
    });
});

