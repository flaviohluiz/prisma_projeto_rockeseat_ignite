import { Deliveryman } from "@prisma/client";
import { CreateDeliverymanUseCase, ICreateDeliveryman } from "../createDeliveryman/CreateDeliverymanUseCase";
import { DeleteDeliverymanUseCase } from "../deleteDeliveryman/DeleteDeliverymanUseCase";
import { FindAllDeliveriesDeliverymanUseCase } from "./FindAllDeliveriesDeliverymanUseCase";

let createDeliverymanUseCase: CreateDeliverymanUseCase;
let deliveryman: ICreateDeliveryman;
let deliverymanCreated: Deliveryman;
let findAllDeliveriesDeliverymanUseCase: FindAllDeliveriesDeliverymanUseCase;
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase;

describe("Find All Deliveryman Deliveries", () => {
    
    beforeEach(()=>{
        
        createDeliverymanUseCase = new CreateDeliverymanUseCase();        

        deliveryman ={
            username: "FindAllDeliverymanDeliveries",
            password: "FindAllDeliverymanDeliveries",
        }

        findAllDeliveriesDeliverymanUseCase = new FindAllDeliveriesDeliverymanUseCase();
    });
    
    it("should be able to show all deliveryman deliveries", async () => {
        deliverymanCreated = await createDeliverymanUseCase.execute(deliveryman);

        const findAllDeliveries = await findAllDeliveriesDeliverymanUseCase.execute(deliverymanCreated.id);
       
        expect(findAllDeliveries).toEqual([{deliveries:[], id: deliverymanCreated.id, username: deliverymanCreated.username}])
    });

    afterAll(async () => {
        
        deleteDeliverymanUseCase = new DeleteDeliverymanUseCase();
        
        await deleteDeliverymanUseCase.execute(deliverymanCreated.id);
    });
});