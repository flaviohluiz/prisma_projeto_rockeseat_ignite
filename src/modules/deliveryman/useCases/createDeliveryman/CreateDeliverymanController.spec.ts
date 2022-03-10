import request from 'supertest';
import { app } from '../../../../app';
import { DeleteDeliverymanUseCase } from '../deleteDeliveryman/DeleteDeliverymanUseCase';
import { FindDeliverymanUseCase } from '../findDeliveryman/findDeliverymanUseCase';
import { ICreateDeliveryman } from './CreateDeliverymanUseCase';

let deliveryman: ICreateDeliveryman;
let findDeliverymanUseCase: FindDeliverymanUseCase;
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase

describe("Create Deliveryman Controller", () => {
    beforeEach(() => {
        deliveryman = {
            username: "deliverymanSuperTest",
            password: "deliverymanSuperTest",
        };
    });
    
    it("should be able to create a new deliveryman", async () => {
        const response = await request(app).post('/deliveryman').send(deliveryman);

        expect(response.status).toBe(200);
    }); 
    
    it("should not be able to create an existing deliveryman", async () => {
        const response = await request(app).post('/deliveryman').send(deliveryman);

        expect(response.status).toBe(400);
    }); 

    afterAll(async () => {
        findDeliverymanUseCase = new FindDeliverymanUseCase();
        deleteDeliverymanUseCase = new DeleteDeliverymanUseCase();

        const deliverymanCreated = await findDeliverymanUseCase.execute(deliveryman.username);
        
        if(deliverymanCreated){
            await deleteDeliverymanUseCase.execute(deliverymanCreated.id);
        };       

    });
});