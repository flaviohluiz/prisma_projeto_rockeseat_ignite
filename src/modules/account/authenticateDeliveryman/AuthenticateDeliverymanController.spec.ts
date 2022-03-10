import request from "supertest";
import { app } from "../../../app";
import { ICreateDeliveryman } from "../../deliveryman/useCases/createDeliveryman/CreateDeliverymanUseCase";
import { DeleteDeliverymanUseCase } from "../../deliveryman/useCases/deleteDeliveryman/DeleteDeliverymanUseCase";
import { FindDeliverymanUseCase } from "../../deliveryman/useCases/findDeliveryman/findDeliverymanUseCase";

let deliveryman: ICreateDeliveryman;
let findDeliverymanUseCase: FindDeliverymanUseCase;
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase

describe("Authenticate Deliveryman Controlller", () => {
    beforeEach(() =>{
        deliveryman = {
            username: "deliverymanAuthenticateSuperTest",
            password: "deliverymanAuthenticateSuperTest",
        };
    });
    
    it("should be able to authenticate a deliveryman", async () => {
        await request(app).post('/deliveryman').send(deliveryman);
        
        const response = await request(app).post('/deliveryman/authenticate').send(deliveryman);

        expect(response.status).toBe(200);
    });

    it("should not be able to authenticate an inexisting deliveryman", async () => {
        const response = await request(app).post('/deliveryman/authenticate').send({
            username: "falseAuthenticateDeliveryman",
            password: "falseAuthenticateDeliveryman",
        });

        expect(response.status).toBe(400);
    });

    it("should not be able to authenticate a deliveryman whith incorrect password", async () => {
        const response = await request(app).post('/deliveryman/authenticate').send({
            username: deliveryman.username,
            password: "incorrectPassword",
        });

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