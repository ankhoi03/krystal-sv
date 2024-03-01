import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaErrorCode } from '../utils/prisma-error-code';
import { FilterQuery } from '../utils/global.dto';

@Injectable()
export class FollowService {
  constructor(private prismaService: PrismaService) {}

  async follow(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new ConflictException('Cannot follow yourself');
    }
    await this.prismaService.follow
      .create({
        data: {
          followerId,
          followingId,
        },
      })
      .catch((error) => {
        if (error.code === PrismaErrorCode.UniqueConstraintFailed) {
          throw new ConflictException('User already followed');
        }

        if (error.code === PrismaErrorCode.RecordDoesNotExist) {
          throw new NotFoundException('User not found');
        }

        throw error;
      });

    return { message: 'User followed successfully' };
  }

  async unfollow(followerId: number, followingId: number) {
    await this.prismaService.follow
      .delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      })
      .catch((error) => {
        if (error.code === PrismaErrorCode.RecordDoesNotExist) {
          throw new NotFoundException('You are not following this user');
        }
        throw error;
      });

    return { message: 'User unfollowed successfully' };
  }

  async getFollowers(userId: number, filterQuery: FilterQuery) {
    const followers = await this.prismaService.follow.findMany({
      where: {
        followingId: userId,
      },
      select: {
        follower: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
      skip: filterQuery.skip,
      take: filterQuery.take,
    });

    return followers.map((follower) => follower.follower);
  }

  async getFollowing(userId: number, filterQuery: FilterQuery) {
    const following = await this.prismaService.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        following: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
      skip: filterQuery.skip,
      take: filterQuery.take,
    });

    return following.map((follow) => follow.following);
  }
}
