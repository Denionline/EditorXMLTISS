import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

export type SafeUser = Omit<User, 'password_hash'>;

const SafeSelect = {
	id: true,
	email: true,
	username: true,
	isActive: true,
	createdAt: true,
	lastLoginAt: true,
};

@Injectable()
export class UserRepository {
	constructor(private prisma: PrismaService) {}

	findByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}
	findById(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}
	create(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}
	update(id: string, data: Prisma.UserUpdateInput): Promise<SafeUser | null> {
		return this.prisma.user.update({
			where: {
				id,
			},
			data,
			select: SafeSelect,
		});
	}
	delete(id: string) {
		return this.prisma.user.delete({ where: { id } });
	}
}
