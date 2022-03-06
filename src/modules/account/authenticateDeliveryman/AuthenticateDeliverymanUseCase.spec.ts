import { Deliveryman } from "@prisma/client";
import { CreateDeliverymanUseCase, ICreateDeliveryman } from "../../deliveryman/useCases/createDeliveryman/CreateDeliverymanUseCase";
import { DeleteDeliverymanUseCase } from "../../deliveryman/useCases/deleteDeliveryman/DeleteDeliverymanUseCase";
import { AuthenticateDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";



let createDeliverymanUseCase: CreateDeliverymanUseCase;
let authenticateDeliverymanUseCase: AuthenticateDeliverymanUseCase;
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase;
let deliveryman: ICreateDeliveryman;
let deliverymanCreated: Deliveryman;

describe("Authenticate Deliveryman", () => {
    
    beforeEach(() => {
        authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();
        createDeliverymanUseCase = new CreateDeliverymanUseCase();
        deleteDeliverymanUseCase = new DeleteDeliverymanUseCase();
        
        deliveryman = {
            username: "AuthenticateDeliveryman",
            password: "AuthenticateDeliveryman",
        }
    });
    
    it("should be able to authenticate a deliveryman", async () => {
        
        deliverymanCreated = await createDeliverymanUseCase.execute(deliveryman);        

        const deliverymanAuthenticate = await authenticateDeliverymanUseCase.execute({
            username: deliveryman.username,
            password: deliveryman.password,
        });

        //expect(deliverymanAuthenticate).toHaveProperty("string");
    });

    it("should not be able to authenticate an nonexistent deliveryman", () => {
        expect(async () => {
            await authenticateDeliverymanUseCase.execute({
                username: "FalseDeliveryman",
                password: "FalseDeliveryman",
            });
        }).rejects.toBeInstanceOf(Error);
    });

    it("should not be able to authenticate a deliveryman with incorrect password", () => {
        expect(async () => {            

            await authenticateDeliverymanUseCase.execute({
                username: deliveryman.username,
                password: "IncorrectPassword",
            })
        }).rejects.toBeInstanceOf(Error);
    });

    afterAll(() => {
        deleteDeliverymanUseCase.execute(deliverymanCreated.id);
    });
});
