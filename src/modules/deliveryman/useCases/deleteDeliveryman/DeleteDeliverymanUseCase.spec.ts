import { CreateDeliverymanUseCase, ICreateDeliveryman } from "../createDeliveryman/CreateDeliverymanUseCase";
import { DeleteDeliverymanUseCase } from "./DeleteDeliverymanUseCase";

let createDeliverymanUseCase: CreateDeliverymanUseCase;
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase;
let deliveryman: ICreateDeliveryman;

describe("Delete Delivery", () => {
    beforeEach(() =>{
        createDeliverymanUseCase = new CreateDeliverymanUseCase();
        deleteDeliverymanUseCase = new DeleteDeliverymanUseCase();

        deliveryman = {
            username: "deleteClient",
            password: "deleteClient"
        };
    });

    it("should be able to delete a client", async () => {
        
        const deliverymanCreated = await createDeliverymanUseCase.execute(deliveryman);
        
        const deliverymanDeleted = await deleteDeliverymanUseCase.execute(deliverymanCreated.id);
        
        expect(deliverymanDeleted).toHaveProperty("id");
    });

});