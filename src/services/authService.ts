import bcrypt from 'bcrypt';
import { AuthRepository } from '../repositories/authRepository';

export class AuthService {
  static async login(email: string, password: string) {
    const user = await AuthRepository.findByEmail(email);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      }
    }
    throw new Error('Usuario o contraseña no válido.');
  }

  static async register(email: string, password: string) {
    const existingUser = await AuthRepository.findByEmail(email);
    if (!existingUser) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await AuthRepository.create({ email, password: hashedPassword });
        if (user) {
          return user;
        }
        throw new Error('Error desconocido al crear el usuario.');
      } catch (error) {
        throw new Error(`Error al crear el usuario: ${error}`);
      }
    }
    throw new Error('Este email ya se encuentra en uso.');
  }
}
