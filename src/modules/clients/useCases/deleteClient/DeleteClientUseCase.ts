import { prisma } from "../../../../database/prismaClient";

export class DeleteClientUseCase {
    async execute( id_client: string): Promise<boolean>{
        const clientDeleted = await prisma.clients.delete({
            where: {                
                id: id_client,
            },
        });
        
        if(clientDeleted){
            return true;
        }
        
        return false;       
    };
};
