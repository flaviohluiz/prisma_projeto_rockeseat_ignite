import { prisma } from "../../../../database/prismaClient";


export class FindDeliverymanUseCase{
    async execute(username: string){
        const findDeliveryman = await prisma.deliveryman.findFirst({
            where: {
                username: username,
            },
            select: {
                username:true,
                id: true,                
            },
        });
        
        return findDeliveryman;
    };    
};