import { prisma } from "../../../../database/prismaClient";


export class DeleteDeliverymanUseCase {
    async execute( id_deliveryman: string): Promise<boolean>{
        const deliverymanDeleted = await prisma.deliveryman.delete({
            where: {                
                id: id_deliveryman,
            },
        });
        
        if(deliverymanDeleted) {
            return true;
        }
        
        return false;                  
    }; 
};