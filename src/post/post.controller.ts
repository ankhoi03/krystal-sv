import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PostService } from './post.service';
import { CreatePostDto, PostResponseDto } from './post.dto';
import { RequestWithUser } from '../auth/auth.interface';

@ApiTags('Post')
@Controller('post')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Post Information',
    type: PostResponseDto,
  })
  async createPost(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postService.createPost({
      userId: req.user.id,
      ...createPostDto,
    });
  }
}
