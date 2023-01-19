import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { BaseDTO } from "../../../config/base.dto";
import { IsNotBlank } from "../../shared/validators/IsNotBlankValidator";
import { UserSettings } from "../utils/Constants";
import { RoleType } from "../utils/Enums";

export class UserDTO extends BaseDTO {

  @IsNotBlank()
  @IsString()
  @IsDefined()
  @MinLength(UserSettings.MIN_NAME_LENGTH)
  @MaxLength(UserSettings.MAX_NAME_LENGTH)
  name?: string;

  @IsNotBlank()
  @IsString()
  @IsDefined()
  @MinLength(UserSettings.MIN_LASTNAME_LENGTH)
  @MaxLength(UserSettings.MAX_LASTNAME_LENGTH)
  lastname?: string;

  @IsNotBlank()
  @IsString()
  @IsDefined()
  @MinLength(UserSettings.MIN_USERNAME_LENGTH)
  @MaxLength(UserSettings.MAX_USERNAME_LENGTH)
  username?: string;

  @IsDefined()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    { message: 'invalid email format' },
  )
  @MinLength(UserSettings.MIN_EMAIL_LENGTH)
  @MaxLength(UserSettings.MAX_EMAIL_LENGTH)
  email?: string;

  @IsNotBlank()
  @IsString()
  @IsDefined()
  password?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsNotBlank()
  @IsDefined()
  @IsEnum(RoleType)
  role?: RoleType;

  constructor(userDTO: Partial<UserDTO>) {
    super();
    Object.assign(this, userDTO);
  }

}

export class UserUpdateDTO extends BaseDTO {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(UserSettings.MIN_NAME_LENGTH)
  @MaxLength(UserSettings.MAX_NAME_LENGTH)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(UserSettings.MIN_LASTNAME_LENGTH)
  @MaxLength(UserSettings.MAX_LASTNAME_LENGTH)
  lastname?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  country?: string;


  constructor(userDTO: Partial<UserUpdateDTO>) {
    super();
    Object.assign(this, userDTO);
  }
}

export class UserUpdatePasswordDTO extends BaseDTO {

  @IsNotBlank()
  @IsString()
  @IsDefined()
  password?: string;


  constructor(userDTO: Partial<UserUpdatePasswordDTO>) {
    super();
    Object.assign(this, userDTO);
  }
}

export class UserUpdateRoleDTO extends BaseDTO {

  @IsNotBlank()
  @IsDefined()
  @IsEnum(RoleType)
  role?: string;


  constructor(userDTO: Partial<UserUpdateRoleDTO>) {
    super();
    Object.assign(this, userDTO);
  }
}

