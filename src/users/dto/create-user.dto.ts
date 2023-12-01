import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  age: number;

  @IsNotEmpty()
  position: string;
}
