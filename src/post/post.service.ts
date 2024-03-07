import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostParams } from './post.interface';

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
    });
    return post;
  }
}
