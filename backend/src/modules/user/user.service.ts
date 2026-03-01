import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class UserService {
	constructor(private repo: UserRepository) {}

	async create(dto: CreateUserDTO) {
		return await this.repo.create(dto);
	}
	async getUserByEmail(email: string): Promise<User | null> {
		return await this.repo.findByEmail(email);
	}
	async update(id: string, dto: UpdateUserDTO) {
		return await this.repo.update(id, dto);
	}
	async delete(id: string) {
		return await this.repo.delete(id);
	}
}
