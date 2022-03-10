import { prisma } from "../../../../database/prismaClient";


export class FindClientUseCase{
    async execute(username: string){
        const findClient = await prisma.clients.findFirst({
            where: {
                username: username,
            },
            select: {
                username:true,
                id: true,                
            },
        });
        
        return findClient
    };    
};