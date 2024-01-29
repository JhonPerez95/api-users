import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    let user: User = await this.repository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }
    user = new User(createUserDto);
    await this.repository.save(user);
    return { status: HttpStatus.CREATED, error: null };
  }

  async findAll() {
    const arrUser: User[] = await this.repository.find();
    if (!arrUser) {
      return { status: HttpStatus.NOT_FOUND, error: ['User not found'] };
    }
    return { status: HttpStatus.OK, error: null, data: arrUser };
  }

  async findOne(id: string) {
    const user: User = await this.repository.findOne({ where: { id } });

    if (!user) {
      return { status: HttpStatus.NOT_FOUND, error: ['User not found'] };
    }
    return { status: HttpStatus.OK, error: null, data: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: User = await this.repository.findOne({ where: { id } });

    if (!user) {
      return { status: HttpStatus.NOT_FOUND, error: ['User not found'] };
    }
    await this.repository.update(id, updateUserDto);

    return { status: HttpStatus.OK, error: null };
  }

  async remove(id: string) {
    const user: User = await this.repository.findOne({ where: { id } });

    if (!user) {
      return { status: HttpStatus.NOT_FOUND, error: ['User not found'] };
    }
    await this.repository.delete(id);

    return { status: HttpStatus.OK, error: null };
  }
}
