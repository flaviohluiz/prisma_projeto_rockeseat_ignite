import { Deliveryman } from "@prisma/client";
import { CreateDeliverymanUseCase, ICreateDeliveryman } from "../createDeliveryman/CreateDeliverymanUseCase";
import { DeleteDeliverymanUseCase } from "../deleteDeliveryman/DeleteDeliverymanUseCase";
import { FindDeliverymanUseCase } from "./findDeliverymanUseCase";

let createDeliverymanUseCase: CreateDeliverymanUseCase;
let deliveryman: ICreateDeliveryman;
let deliverymanCreated: Deliveryman;
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase;
let findDeliverymanUseCase: FindDeliverymanUseCase;


describe("Find Deliveryman", () => {

    beforeEach(() => {
        
        createDeliverymanUseCase = new CreateDeliverymanUseCase();
        findDeliverymanUseCase = new FindDeliverymanUseCase();
        
        deliveryman = {
            username: "findDeliveryman",
            password: "findDeliveryman",
        }
    });
    
    it("should be able to find a deliveryman", async () => {
        deliverymanCreated = await createDeliverymanUseCase.execute(deliveryman);

        const findDeliveryman = await findDeliverymanUseCase.execute(deliverymanCreated.username);

        expect(findDeliveryman).toEqual({username: deliverymanCreated.username, id: deliverymanCreated.id});
    });
    
    afterAll(async () => {
        deleteDeliverymanUseCase = new DeleteDeliverymanUseCase();
        await deleteDeliverymanUseCase.execute(deliverymanCreated.id);
    });
    
});