import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserStatus } from './user.interface';
import { PrismaErrorCode } from '../utils/prisma-error-code';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async createUser(email: string) {
    const user = await this.prisma.user
      .create({
        data: {
          email,
          username: email.split('@')[0],
          status: UserStatus.active,
        },
      })
      .catch((err) => {
        if (err.code === PrismaErrorCode.UniqueConstraintFailed) {
          throw new ConflictException('Email already exists');
        }
        throw err;
      });
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      background: user.background,
      description: user.description,
      status: user.status,
    };
  }

  public async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        background: true,
        description: true,
        status: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // public async updateUser(id: number, updateProfileDTO: UpdateUserDTO) {
  //   const result = this.prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       username: updateProfileDTO.username,
  //       avatar: updateProfileDTO.avatar,
  //       background: updateProfileDTO.background,
  //       description: updateProfileDTO.description,
  //     },
  //   });
  //   if (!result) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return {
  //     message: 'Profile updated successfully',
  //   };
  // }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        background: true,
        description: true,
        status: true,
      },
    });
    return user;
  }
}
