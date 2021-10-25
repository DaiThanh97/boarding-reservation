import { EntityRepository, Repository, InsertResult } from 'typeorm';
import { CreateUser } from './interfaces/user.interface';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createUser(createUserDto: CreateUser): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        username: createUserDto.username,
        password: createUserDto.password,
        name: createUserDto.name,
        phone: createUserDto.phone,
      })
      .execute();
  }

  async getUserById(id: number): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async getUserByUsername(username: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }
}
