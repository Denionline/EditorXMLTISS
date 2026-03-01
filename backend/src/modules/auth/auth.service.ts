import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import type { User } from 'generated/prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<User | null> {
		const user = await this.userService.getUserByEmail(email);

		if (user && user.password === password) {
			return user;
		}
		return null;
	}

	login(user: User | undefined) {
		if (!user) {
			return null;
		}
		const payload = { sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
