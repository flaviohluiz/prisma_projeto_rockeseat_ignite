import request from 'supertest';
import { app } from '../../../../app';


describe("Create Delivery Controller", () => {
    it("", async () => {
        const response = await request(app).post("/delivery").send({
            item_name: "deliverySuperTest",
        });

        expect(response.status).toBe(200);
    });
});

