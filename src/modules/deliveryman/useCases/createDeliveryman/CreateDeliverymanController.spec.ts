import request from 'supertest';
import { app } from '../../../../app';


describe("Create Deliveryman Controller", () => {
    it("", async () => {
        const response = await request(app).post('/deliveryman').send({
            username: "deliverymanSuperTest",
            password: "deliverymanSuperTest",
        });

        expect(response.status).toBe(200);
    });  
});