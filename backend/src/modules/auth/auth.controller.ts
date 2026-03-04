import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import type { User } from 'generated/prisma/client';
import type { Request, Response } from 'express';
import { CreateUserDTO } from '../user/user.dto';
import { JwtAuthGuard } from './jwt--auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private service: AuthService) { }

	private setRefreshToken(res: Response, token: string | undefined) {
		res.cookie('refresh_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Req() req: { user: User }, @Res({ passthrough: true }) res: Response) {
		const tokens = this.service.getTokens(req.user);
		this.setRefreshToken(res, tokens.refresh_token);
		return { access_token: tokens.access_token };
	}

	@Post('register')
	async register(
		@Body() dto: CreateUserDTO,
		@Res({ passthrough: true }) res: Response,
	) {
		const tokens = await this.service.register(dto);
		this.setRefreshToken(res, tokens.refresh_token);
		return { access_token: tokens.access_token };
	}

	@UseGuards(JwtAuthGuard)
	@Post('profile')
	profile(@Req() { user }: { user: User }) {
		return user;
	}

	@UseGuards(JwtAuthGuard)
	@Post('refresh')
	refresh(
		@Req() req: { cookies: { refresh_token: string } },
		@Res({ passthrough: true }) res: Response,
	) {
		const refreshToken = req.cookies['refresh_token'];
		const { access_token } = this.service.refresh(refreshToken);

		this.setRefreshToken(res, access_token);
		return { access_token };
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('refresh_token');
		return { message: 'Logged out successfully' };
	}
}
