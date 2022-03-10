import request from 'supertest';
import { app } from '../../../../app';
//import { DeleteClientUseCase } from '../deleteClient/DeleteClientUseCase';
//import { FindClientUseCase } from '../findClient/FindClientUseCase';
import { ICreateClient } from './CreateClientUseCase';

let client: ICreateClient;
//let findClientUseCase: FindClientUseCase;
//let deleteClientUseCase: DeleteClientUseCase;

describe("Create Client Controller", () => {
    
    beforeEach(() => {
        client = {
            username: "clientSuperTest",
            password: "clientSuperTest",
        };
        
    });
    
    
    it("should be able to create a new client", async () => {
        const response = await request(app).post("/client").send(client);        

        expect(response.status).toBe(200);        
    });

    it("should not be able to create an existing client", async () => {
        const response = await request(app).post("/client").send(client);        
 
        expect(response.status).toBe(400);
    });    
    
    afterAll(async () => {        
        //findClientUseCase = new FindClientUseCase();
        //deleteClientUseCase = new DeleteClientUseCase();
        
        //const clientCreated = await findClientUseCase.execute(client.username);

        const clientCreated = await request(app).get(`/client/findClient/`).send(client.username);
        
        const {id} = clientCreated.body;        
        
        await request(app).delete(`/client/deleteClient/${id}`).send();


        // if(clientCreated){
        //     //await deleteClientUseCase.execute(clientCreated.id)
        //     await request(app).delete(`/client/deleteClient/${clientCreated.id}`).send();
        // };    

    });
     
});

