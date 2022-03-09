import request from 'supertest';
import { app } from '../../../../app';


describe("Create Client Controller", () => {
    
    it("", async () => {
       const response = await request(app).post("/client").send({
            username: "clientSuperTest",
            password: "clientSuperTest",
        });

        expect(response.status).toBe(200);
    });    
});

