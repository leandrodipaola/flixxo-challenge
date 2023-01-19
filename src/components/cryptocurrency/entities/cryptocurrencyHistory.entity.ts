
import { IsDefined, IsNumber } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BEntity } from "../../../config/base.entity";
import { Cryptocurrency } from "./cryptocurrency.entity";

@Entity({ name: "cryptocurrency_history" })
export class CryptocurrencyHistory extends BEntity {

    @Column()
    @IsNumber()
    @IsDefined()
    price!: number;

    @Column()
    @IsNumber()
    @IsDefined()
    cryptocurrencyId!: number;


    @ManyToOne(() => Cryptocurrency, (cryptocurrency: Cryptocurrency) => cryptocurrency.cryptocurrencyHistory)
    @JoinColumn({ name: "cryptocurrency_id" })
    cryptocurrency!: Cryptocurrency;


}