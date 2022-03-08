import { prisma } from "../../../../database/prismaClient";


export class DeleteDeliveryUseCase {
    async execute(id_delivery: string){
        const deliveryDeleted = prisma.deliveries.delete({
            where: {
                id: id_delivery, 
            },
        });
                       
        return deliveryDeleted;
    };
};