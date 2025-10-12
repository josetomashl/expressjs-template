import { compare } from 'bcrypt';

import type { LoginDTO, RegisterDTO } from '../constraints/authConstraints';
import { AppDataSource } from '../database/data-source';
import { User } from '../database/entities/User';
import { hashPassword } from '../utils/crypto';

export class AuthService {
  private static usersRepository = AppDataSource.getRepository(User);

  static async login(data: LoginDTO) {
    const user = await this.usersRepository.findOneBy({ email: data.email });
    if (user) {
      const isValid = await compare(data.password, user.password);
      if (isValid) {
        return user;
      }
    }
    throw new Error('Usuario o contraseña no válido.');
  }

  static async register(data: RegisterDTO) {
    const existingUser = await this.usersRepository.findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error('Este email ya se encuentra en uso.');
    }
    try {
      const hashedPassword = await hashPassword(data.password);
      const user = this.usersRepository.create({ ...data, password: hashedPassword });
      const res = await this.usersRepository.save(user);
      return res;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error}`);
    }
  }
}
