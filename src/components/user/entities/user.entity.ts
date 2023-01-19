import { IsDefined, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BEntity } from "../../../config/base.entity";
import { Cryptocurrency} from "../../cryptocurrency/entities/cryptocurrency.entity";
import { IsNotBlank } from "../../shared/validators/IsNotBlankValidator";
import { IsUniqLower } from "../../shared/validators/UniqueLowerValidator";
import { UserSettings } from "../utils/Constants";
import { RoleType } from "../utils/Enums";

@Entity({ name: "user" })
export class User extends BEntity {

  @Column()
  @IsNotBlank()
  @IsString()
  @IsDefined()
  @MinLength(UserSettings.MIN_NAME_LENGTH)
  @MaxLength(UserSettings.MAX_NAME_LENGTH)
  name!: string;

  @Column()
  @IsNotBlank()
  @IsString()
  @IsDefined()
  @MinLength(UserSettings.MIN_LASTNAME_LENGTH)
  @MaxLength(UserSettings.MAX_LASTNAME_LENGTH)
  lastname!: string;

  @Column()
  @IsNotBlank()
  @IsString()
  @IsDefined()
  @IsUniqLower()
  @MinLength(UserSettings.MIN_USERNAME_LENGTH)
  @MaxLength(UserSettings.MAX_USERNAME_LENGTH)
  username!: string;

  @Column()
  @IsDefined()
  @IsUniqLower()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    { message: 'invalid email format' },
  )
  @MinLength(UserSettings.MIN_EMAIL_LENGTH)
  @MaxLength(UserSettings.MAX_EMAIL_LENGTH)
  email!: string;

  @Column({ select: false })
  @IsNotBlank()
  @IsString()
  @IsDefined()
  password!: string;

  @Column()
  @IsOptional()
  @IsString()
  country?: string;

  @Column({ type: "enum", enum: RoleType})
  @IsNotBlank()
  @IsString()
  @IsDefined()
  role!: RoleType;

  @OneToMany(() => Cryptocurrency, (cryptocurrency) => cryptocurrency.user)
  @JoinColumn({ name: "cryptocurrency_id" })
  cryptoCurrencies!: Cryptocurrency[]

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}


