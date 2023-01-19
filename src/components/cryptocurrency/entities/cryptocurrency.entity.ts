
import { IsDefined, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { BEntity } from "../../../config/base.entity";
import { IsNotBlank } from "../../shared/validators/IsNotBlankValidator";
import { IsUniqLower } from "../../shared/validators/UniqueLowerValidator";
import { User } from "../../user/entities/user.entity";
import { CryptocurrencySettings } from "../utils/Constants";
import { CryptocurrencyHistory } from "./cryptocurrencyHistory.entity";

@Entity({ name: "cryptocurrency" })
export class Cryptocurrency extends BEntity {

    @Column()
    @IsNotBlank()
    @IsString()
    @IsDefined()
    @IsUniqLower()
    @MinLength(CryptocurrencySettings.MIN_COINNAME_LENGTH)
    @MaxLength(CryptocurrencySettings.MAX_COINNAME_LENGTH)
    coinName!: string;

    @Column()
    @IsNotBlank()
    @IsString()
    @IsDefined()
    @IsUniqLower()
    @MinLength(CryptocurrencySettings.MIN_SYMBOL_LENGTH)
    @MaxLength(CryptocurrencySettings.MAX_SYMBOL_LENGTH)
    symbol!: string;

    @Column()
    @IsNumber()
    @IsDefined()
    price!: number;

    @Column()
    @IsOptional()
    @IsString()
    description?: string;

    @Column()
    @IsNumber()
    @IsDefined()
    userId!: number;

    @ManyToOne(() => User, (user: User) => user.cryptoCurrencies)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @OneToMany(() => CryptocurrencyHistory, (cryptocurrencyHistory) => cryptocurrencyHistory.cryptocurrency)
    @JoinColumn({ name: "cryptocurrency_history_id" })
    cryptocurrencyHistory!: CryptocurrencyHistory[];


}