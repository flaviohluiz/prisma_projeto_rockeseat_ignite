import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCase";


describe("Create Deliveryman", () => {
    
    it("should be able to create a deliveryman", async () => {
        const deliveryman = {
            username: "Deliveryman",
            password: "Deliveryman"
        };
        
        const createDeliveryman = new CreateDeliverymanUseCase();

        const deliverymanCreated = await createDeliveryman.execute(deliveryman);

        expect(deliverymanCreated).toHaveProperty("id");
    });
});