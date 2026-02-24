import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

const SafeSelect = {
	id: true,
	username: true,
	email: true,
};

@Injectable()
export class UserRepository {
	constructor(private prisma: PrismaService) {}

	findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}
	findById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			select: SafeSelect,
		});
	}
	create(data: Prisma.UserCreateInput) {
		return this.prisma.user.create({
			data,
			select: SafeSelect,
		});
	}
	update(id: string, data: Prisma.UserUpdateInput) {
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
