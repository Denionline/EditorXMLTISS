import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import type { User } from 'generated/prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../user/user.dto';
import { jwtSecrect } from './strategies/jwt.strategy';

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

		const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
		const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

		return { access_token, refresh_token };
	}

	async refresh(refresh_token: string) {
		try {
			const payload: { sub: string; username: string } =
				await this.jwtService.verifyAsync(refresh_token, {
					secret: jwtSecrect,
				});

			if (!payload) {
				throw new UnauthorizedException('Invalid refresh token');
			}

			const user = await this.userService.getUserById(payload.sub);

			if (!user) {
				throw new UnauthorizedException('User not found');
			}

			return this.getTokens(user);
		} catch {
			throw new UnauthorizedException('Invalid or expired refresh token');
		}
	}
}
