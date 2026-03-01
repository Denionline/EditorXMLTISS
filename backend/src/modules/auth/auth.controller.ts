import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import type { User } from 'generated/prisma/client';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private service: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Req() req: { user: User }, @Res() res: Response) {
		const tokens = this.service.login(req.user);

		res.cookie('refresh_token', tokens?.refresh_token, {
			httpOnly: true,
			secure: process.env.DEVELOPMENT === 'production',
			sameSite: 'strict',
			maxAge: 1 * 24 * 60 * 60 * 1000,
		});
		return { access_token: tokens?.access_token };
	}
}
