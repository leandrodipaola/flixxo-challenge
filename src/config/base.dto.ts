import { IsDate, IsNumber, IsOptional } from "class-validator";

export class BaseDTO {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  deletedAt?:Date;
}
