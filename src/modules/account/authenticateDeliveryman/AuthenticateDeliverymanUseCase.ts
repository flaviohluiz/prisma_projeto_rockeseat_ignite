import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";


interface IAuthenticateDeliveryman{
    username: string;
    password: string;
}

interface IResponse{
    deliveryman:{
        username: string,
    },
    token: string,
}

export class AuthenticateDeliverymanUseCase {
    async execute({username, password}: IAuthenticateDeliveryman): Promise<IResponse> {

        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        });

        if(!deliveryman) {
            throw new Error ("Username or password invalid!");
        }

        const passwordMatch = await compare(password, deliveryman.password);

        if(!passwordMatch) {
            throw new Error ("Username or password invalid!");
        }

        const token = sign({username}, "1ea74cfadacdec4db8badd77b18fd42a", {
            subject: deliveryman.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token, 
            deliveryman: {
                username: deliveryman.username,                
            }
        }

        return tokenReturn;
    }
}

// Receber as informações do usuário (username e password)
// Verificar se o usuário está cadastrado
// Verificar se a senha corresponde ao usuário
// Gerar o token