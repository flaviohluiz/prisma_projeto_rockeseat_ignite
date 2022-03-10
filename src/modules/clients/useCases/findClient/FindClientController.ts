import { Request, Response } from "express";
import { FindClientUseCase } from "./FindClientUseCase";


export class FindClientController {
    async handle(request: Request, response: Response){
        
        const {username} = request.body;

        const findClientUseCase = new FindClientUseCase();

        const client = await findClientUseCase.execute(username);

        return response.json(client);
    }
}