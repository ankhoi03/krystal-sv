import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostParams, UpdatePostParams } from './post.interface';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  public async createPost(params: CreatePostParams) {
    const post = await this.prisma.post.create({
      data: {
        content: params.content,
        user: {
          connect: {
            id: params.userId,
          },
        },
        media: params?.media,
      },
      select: {
        id: true,
        content: true,
        media: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        like: true,
        comment: true,
      },
    });
    return {
      id: post.id,
      content: post.content,
      media: post.media,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: {
        id: post.user.id,
        username: post.user.username,
        avatar: post.user.avatar,
      },
      like: post.like.length,
      comment: post.comment.length,
    };
  }

  public async getPostById(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
        deletedAt: null,
      },
      select: {
        id: true,
        content: true,
        media: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        like: true,
        comment: true,
      },
    });
    if (!post) {
      throw new NotFoundException('Post not found or has been deleted');
    }
    return {
      id: post.id,
      content: post.content,
      media: post.media,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: {
        id: post.user.id,
        username: post.user.username,
        avatar: post.user.avatar,
      },
      like: post.like.length,
      comment: post.comment.length,
    };
  }

  public async updatePost(
    postId: number,
    requestBy: number,
    params: UpdatePostParams,
  ) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
        deletedAt: null,
      },
      select: {
        id: true,
        userId: true,
      },
    });
    if (!post) {
      throw new NotFoundException('Post not found or has been deleted');
    }
    if (post?.userId !== requestBy) {
      throw new NotFoundException('You are not allowed to update this post');
    }
    const postUpdated = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content: params.content,
      },
      select: {
        id: true,
        content: true,
        media: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        like: true,
        comment: true,
      },
    });
    return {
      id: postUpdated.id,
      content: postUpdated.content,
      media: postUpdated.media,
      createdAt: postUpdated.createdAt,
      updatedAt: postUpdated.updatedAt,
      user: {
        id: postUpdated.user.id,
        username: postUpdated.user.username,
        avatar: postUpdated.user.avatar,
      },
      like: postUpdated.like.length,
      comment: postUpdated.comment.length,
    };
  }

  public async deletePost(postId: number, requestBy: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
        deletedAt: null,
      },
    });
    if (!post) {
      throw new NotFoundException('Post not found or has been deleted');
    }
    if (post?.userId !== requestBy) {
      throw new NotFoundException('You are not allowed to delete this post');
    }
    await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return {
      message: 'Post deleted successfully',
    };
  }

  public async deletePostPermanently() {
    const expired = new Date();
    expired.setDate(expired.getDate() - 30);
    await this.prisma.post.deleteMany({
      where: {
        deletedAt: {
          lt: expired,
        },
      },
    });
  }
}
