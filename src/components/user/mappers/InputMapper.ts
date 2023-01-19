import { UserDTO, UserUpdateDTO, UserUpdatePasswordDTO, UserUpdateRoleDTO } from "../dto/userInput.dto";

export class InputMapper {
    public static parseToUserDTO(user: any): UserDTO {
        const newUser = new UserDTO({
            ...user
        });

        return newUser;
    }

    public static parseToUserUpdateDTO(user: any): UserUpdateDTO {
        const newUser = new UserUpdateDTO({
            ...user
        });

        return newUser;
    }

    public static parseToUserUpdatePasswordDTO(user: any): UserUpdatePasswordDTO {
        const newUser = new UserUpdatePasswordDTO({
            ...user
        });


        return newUser;
    }
    public static parseToUserUpdateRoleDTO(user: any): UserUpdateRoleDTO {
        const newUser = new UserUpdateRoleDTO({
            ...user
        });

        return newUser;
    }
}