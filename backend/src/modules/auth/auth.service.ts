import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import type { User } from 'generated/prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../user/user.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<User | null> {
		const user = await this.userService.getUserByEmail(email);

		if (user && user.password_hash === password) {
			return user;
		}
		return null;
	}

	async register(dto: CreateUserDTO) {
		const newUser = await this.userService.create(dto);
		return this.getTokens(newUser);
	}

	getTokens(user: User): {
		access_token: string;
		refresh_token: string;
	} {
		const payload = { sub: user.id, username: user.username };

		const access_token = this.jwtService.sign(payload, { expiresIn: '60s' });
		const refresh_token = this.jwtService.sign(payload, { expiresIn: '1d' });

		return { access_token, refresh_token };
	}

	refresh(refresh_token: string) {
		const payload: {
			sub: string;
			username: string;
		} = this.jwtService.verify(refresh_token);

		const newAccessToken = this.jwtService.sign(
			{ sub: payload.sub, username: payload.username },
			{ expiresIn: '60s' },
		);
		return { access_token: newAccessToken };
	}
}
