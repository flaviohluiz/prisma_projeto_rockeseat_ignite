// import { Clients } from "@prisma/client";
// import { CreateClientUseCase, ICreateClient } from "../../../clients/useCases/createClient/CreateClientUseCase";
// import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";


// let createDeliveryUseCase: CreateDeliveryUseCase;
// let createClientUseCase: CreateClientUseCase;
// let client: ICreateClient;
// let clientCreated: Clients;

// describe("Create Delivery", () => {

//     beforeEach(() => {
//         createDeliveryUseCase = new CreateDeliveryUseCase();
//         createClientUseCase = new CreateClientUseCase();
//         client = {
//             username: "createDelivery",
//             password: "createDelivery",
//         };
//     });
    
//     it("should be able to create a delivery", async () => {
        
//         clientCreated = await createClientUseCase.execute(client);
        
//         const deliveryCreated = createDeliveryUseCase.execute({
//                 item_name: "deliveryTest",
//                 id_client: clientCreated.id,
//         });

//         expect(deliveryCreated).toHaveProperty("id");
//     });

//     afterAll(() => {

//     });

// });