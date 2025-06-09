import { UserRepository } from '../repositories/userRepository';

export class UserService {
  static async getAll() {
    return await UserRepository.findAll();
  }
}
