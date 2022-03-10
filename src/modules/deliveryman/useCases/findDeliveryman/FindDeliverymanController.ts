import { Request, Response } from "express";
import { FindDeliverymanUseCase } from "./findDeliverymanUseCase";



export class FindDeliverymanController {
    async handle(request: Request, response: Response){
        
        const {username} = request.body;

        const findDeliverymanUseCase = new FindDeliverymanUseCase();

        const deliveryman = await findDeliverymanUseCase.execute(username);

        return response.json(deliveryman);
    }
}