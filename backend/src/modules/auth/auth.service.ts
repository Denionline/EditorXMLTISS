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

	login(user: User | undefined): {
		access_token: string;
		refresh_token: string;
	} | null {
		if (!user) {
			return null;
		}
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
