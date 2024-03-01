import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserStatus } from './user.interface';
import { PrismaErrorCode } from '../utils/prisma-error-code';
import { UpdateProfileDto } from './user.dto';

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
    };
  }

  public async getProfileById(id: number) {
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
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      background: user.background,
      description: user.description,
    };
  }

  public async updateProfile(id: number, updateProfileDTO: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: updateProfileDTO.username,
        avatar: updateProfileDTO.avatar,
        background: updateProfileDTO.background,
        description: updateProfileDTO.description,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      background: user.background,
      description: user.description,
    };
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
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
      },
    });
  }
}
