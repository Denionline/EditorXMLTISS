import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import type { User } from 'generated/prisma/client';

@Controller('auth')
export class AuthController {
	constructor(private service: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Req() req: { user: User }) {
		return this.service.login(req.user);
	}
}
