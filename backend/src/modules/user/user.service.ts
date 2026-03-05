import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class UserService {
	constructor(private repo: UserRepository) {}

	async create({ email, password, username }: CreateUserDTO): Promise<User> {
		return await this.repo.create({ email, username, password_hash: password });
	}
	async getUserByEmail(email: string): Promise<User | null> {
		const user = await this.repo.findByEmail(email);

		if (!user) {
			throw new NotFoundException();
		}
		return user;
	}
	async getUserById(id: string): Promise<User | null> {
		const user = await this.repo.findById(id);

		if (!user) {
			throw new NotFoundException();
		}
		return user;
	}
	async update(id: string, dto: UpdateUserDTO) {
		return await this.repo.update(id, dto);
	}
	async delete(id: string) {
		return await this.repo.delete(id);
	}
}
