import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDTO {
	@IsNotEmpty()
	email: string;
	@IsNotEmpty()
	password: string;
	@IsNotEmpty()
	username: string;
}

export class UpdateUserDTO {
	@IsOptional()
	email: string;
	@IsOptional()
	password: string;
	@IsOptional()
	username: string;
}
