import { Request, Response } from "express";
import { DeleteDeliverymanUseCase } from "./DeleteDeliverymanUseCase";


export class DeleteDeliverymanController {
    async handle(request: Request, response: Response){
        const {id: id_deliveryman} = request.params;

        const deleteDeliverymanUseCase = new DeleteDeliverymanUseCase();

        await deleteDeliverymanUseCase.execute(id_deliveryman);

        return response.status(204).send();
    };
}