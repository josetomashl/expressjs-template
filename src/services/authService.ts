import { compare, hash } from 'bcrypt';

import { AppDataSource } from '../database/data-source';
import { UserEntity } from '../database/entities/User';

export class AuthService {
  private static usersRepository = AppDataSource.getRepository(UserEntity);

  static async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      const isValid = await compare(password, user.password);
      if (isValid) {
        return user;
      }
    }
    throw new Error('Usuario o contraseña no válido.');
  }

  static async register(name: string, surname: string, email: string, password: string) {
    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error('Este email ya se encuentra en uso.');
    }
    try {
      const hashedPassword = await hash(password, 10);
      const user = this.usersRepository.create({ name, surname, email, password: hashedPassword });
      const res = await this.usersRepository.save(user);
      return res;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error}`);
    }
  }
}
