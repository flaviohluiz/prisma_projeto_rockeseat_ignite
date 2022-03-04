import { Request, Response } from "express";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

export class DeleteClientController {
    async handle(request: Request, response: Response){
        const {id: id_client} = request.params;

        const deleteClientUseCase = new DeleteClientUseCase();

        await deleteClientUseCase.execute(id_client);

        return response.status(204).json({
            message: "Client deleted!"
        });
    };
};