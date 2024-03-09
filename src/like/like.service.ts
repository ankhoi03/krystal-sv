import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterQuery } from '../utils/global.dto';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  public async likePost(postId: number, userId: number) {
    const existingPost = await this.prisma.post.findUnique({
      where: {
        id: postId,
        deletedAt: null,
      },
    });
    if (!existingPost) {
      throw new NotFoundException('Post not found or has been deleted');
    }
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (existingLike) {
      await this.prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await this.prisma.like.create({
        data: {
          post: {
            connect: {
              id: postId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    const like = await this.prisma.like.count({
      where: {
        postId,
      },
    });
    return {
      like,
    };
  }

  public async getPostLikes(postId: number, filterQuery: FilterQuery) {
    const likes = await this.prisma.like.findMany({
      where: {
        postId,
      },
      select: {
        user: {
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
    return likes.map((like) => ({
      id: like.user.id,
      username: like.user.username,
      avatar: like.user.avatar,
    }));
  }
}
