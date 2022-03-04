import { CreateClientUseCase } from "./CreateClientUseCase";


describe("Create Client", () => {
    
    it("should be able to create a client", async () => {
        const client = {
            username: "Client",
            password: "Client"
        };
        
        const createClient = new CreateClientUseCase();

        const clientCreated = await createClient.execute(client);

        expect(clientCreated).toHaveProperty("id");
    });
});