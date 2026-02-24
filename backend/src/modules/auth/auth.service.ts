import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async register(dto: CreateUserDTO) {
		return this.userService.create(dto);
	}
	async login(email: string, password: string) {
		const user = await this.userService.getUserByEmail(email);

		if (!user) {
			throw new NotFoundException();
		}

		if (user.password !== password) {
			throw new UnauthorizedException();
		}
	}
	// logout() {}
	// me();
}
