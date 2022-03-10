import request from "supertest";
import { app } from "../../../app";
import { ICreateClient } from "../../clients/useCases/createClient/CreateClientUseCase";
import { DeleteClientUseCase } from "../../clients/useCases/deleteClient/DeleteClientUseCase";
import { FindClientUseCase } from "../../clients/useCases/findClient/FindClientUseCase";

let client: ICreateClient;
let findClientUseCase: FindClientUseCase;
let deleteClientUseCase: DeleteClientUseCase;

describe("Authenticate Client Controlller", () => {
    beforeEach(() =>{
        client = {
            username: "authenticateClientSuperTest",
            password: "authenticateClientSuperTest",
        };
    });
    
    it("should be able to authenticate a client", async () => {
        await request(app).post("/client").send(client);
        const response = await request(app).post("/client/authenticate").send(client);
        
        expect(response.status).toBe(200);
    });

    it("should not be able to authenticate an inexisting client", async () => {
        const response = await request(app).post("/client/authenticate").send({
            username: "falseAuthenticateClient",
            password: "falseAuthenticateClient",
        });
        
        expect(response.status).toBe(400);
    });

    it("should not be able to authenticate a client whith incorrect password", async () => {
        const response = await request(app).post("/client/authenticate").send({
            username: client.username,
            password: "falsePassword",
        });
        
        expect(response.status).toBe(400)
    });

    afterAll(async () => {
        findClientUseCase = new FindClientUseCase();
        deleteClientUseCase = new DeleteClientUseCase();
        
        const clientCreated = await findClientUseCase.execute(client.username);

        if(clientCreated){
            await deleteClientUseCase.execute(clientCreated.id)
        }; 
    });
    
});