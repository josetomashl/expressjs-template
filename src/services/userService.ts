import { UserRepository } from '../repositories/userRepository';

export class UserService {
  static async getAll() {
    return await UserRepository.findAll();
  }

  static async getPaginated(page: number, limit: number) {
    return await UserRepository.findPaginated(page, limit);
  }
}
