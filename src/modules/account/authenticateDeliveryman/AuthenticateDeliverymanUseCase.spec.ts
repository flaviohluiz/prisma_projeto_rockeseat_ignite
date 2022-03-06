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
            username: "authenticateDeliveryman",
            password: "authenticateDeliveryman",
        }
    });
    
    it("should be able to authenticate a deliveryman", async () => {
        
        deliverymanCreated = await createDeliverymanUseCase.execute(deliveryman);        

        const deliverymanAuthenticate = await authenticateDeliverymanUseCase.execute({
            username: deliveryman.username,
            password: deliveryman.password,
        });

        expect(deliverymanAuthenticate).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent deliveryman", () => {
        expect(async () => {
            await authenticateDeliverymanUseCase.execute({
                username: "falseDeliveryman",
                password: "falseDeliveryman",
            });
        }).rejects.toBeInstanceOf(Error);
    });

    it("should not be able to authenticate a deliveryman with incorrect password", () => {
        expect(async () => {            

            await authenticateDeliverymanUseCase.execute({
                username: deliveryman.username,
                password: "incorrectPassword",
            })
        }).rejects.toBeInstanceOf(Error);
    });

    afterAll(() => {
        deleteDeliverymanUseCase.execute(deliverymanCreated.id);
    });
});
