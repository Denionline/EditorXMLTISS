import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';

@Controller('user')
export class UserController {
	constructor(private service: UserService) {}

	@Post()
	create(@Body() dto: CreateUserDTO) {
		return this.service.create(dto);
	}
}
