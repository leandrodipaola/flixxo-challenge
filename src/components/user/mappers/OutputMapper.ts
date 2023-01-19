import { UserDTO } from "../dto/userOutput.dto";
import { User } from "../entities/user.entity";
export class OutputMapper {


    public static parseToUserDTO(user: User): UserDTO {
        return new UserDTO({
            id: user.id,
            name: user.name,
            username: user.username,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            country: user.country,
        });
    }

    public static parseToArrUserDTO(users: User[]): UserDTO[] {

        return users.map((user) => {
            return new UserDTO({
                id: user.id,
                username: user.username,
            })
        });
    }
}