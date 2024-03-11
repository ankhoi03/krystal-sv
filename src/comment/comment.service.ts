import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterQuery } from '../utils/global.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  public async createComment(content: string, userId: number, postId: number) {
    const existingPost = await this.prisma.post.findUnique({
      where: {
        id: postId,
        deletedAt: null,
      },
    });
    if (!existingPost) {
      throw new NotFoundException('Post not found or has been deleted');
    }
    const comment = await this.prisma.comment.create({
      data: {
        content: content,
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      user: {
        id: comment.user.id,
        username: comment.user.username,
        avatar: comment.user.avatar,
      },
    };
  }

  public async getCommentsByPostId(postId: number, filterQuery: FilterQuery) {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
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
    return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      user: {
        id: comment.user.id,
        username: comment.user.username,
        avatar: comment.user.avatar,
      },
    }));
  }

  public async deleteComment(commentId: number, userId: number) {
    const existingComment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!existingComment || existingComment.user.id !== userId) {
      throw new NotFoundException(
        'Comment not found or you are not authorized to delete this comment',
      );
    }
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return {
      message: 'Comment deleted successfully',
    };
  }
}
