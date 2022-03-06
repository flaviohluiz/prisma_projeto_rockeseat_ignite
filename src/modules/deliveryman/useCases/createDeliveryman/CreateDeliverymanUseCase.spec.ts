import { Deliveryman } from "@prisma/client";
import { DeleteDeliverymanUseCase } from "../deleteDeliveryman/DeleteDeliverymanUseCase";
import { CreateDeliverymanUseCase, ICreateDeliveryman } from "./CreateDeliverymanUseCase";

let createDeliverymanUseCase: CreateDeliverymanUseCase;
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase;
let deliveryman: ICreateDeliveryman;
let deliverymanCreated: Deliveryman;

describe("Create Deliveryman", () => {
    
    beforeEach(() => {
        createDeliverymanUseCase = new CreateDeliverymanUseCase();
        deleteDeliverymanUseCase = new DeleteDeliverymanUseCase();
        deliveryman = {
            username: "CreateDeliveryman",
            password: "CreateDeliveryman"
        };
    });

    it("should be able to create a deliveryman", async () => {
        
        deliverymanCreated = await createDeliverymanUseCase.execute(deliveryman);
        
        //const deliverymanCreated = await createDeliverymanUseCase.execute(deliveryman);

        expect(deliverymanCreated).toHaveProperty("id");
        
        //await deleteDeliverymanUseCase.execute(deliverymanCreated.id);
    });

    it("should not be able to create an existing deliveryman", async () => {
        expect(async () => {
            
            await createDeliverymanUseCase.execute(deliveryman);

            // await createDeliverymanUseCase.execute({
            //     username: "TesteDeliverymanTeste",
            //     password: "TesteDeliverymanTeste"
            // });
        }).rejects.toBeInstanceOf(Error);        
    });


    afterAll(() => {
        deleteDeliverymanUseCase.execute(deliverymanCreated.id);
    });
});