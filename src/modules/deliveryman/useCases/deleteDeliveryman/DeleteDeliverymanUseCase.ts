import { prisma } from "../../../../database/prismaClient";


export class DeleteDeliverymanUseCase {
    async execute( id_deliveryman: string){
        const result = await prisma.deliveryman.delete({
            where: {                
                id: id_deliveryman,
            },
        });
        
        return result;          
    }; 
};