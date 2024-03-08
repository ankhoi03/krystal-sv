import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PostService } from './post.service';
import { CreatePostDto, PostResponseDto, UpdatePostDto } from './post.dto';
import { RequestWithUser } from '../auth/auth.interface';
import { MessageResponseDto } from '../utils/global.dto';

@ApiTags('Post')
@Controller('post')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostController {
  constructor(private postService: PostService) {}

  @Get(':id/detail')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Post Information',
    type: PostResponseDto,
  })
  async getPostById(@Param('id') id: string) {
    return await this.postService.getPostById(+id);
  }

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

  @Post(':id/update')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Post Information',
    type: PostResponseDto,
  })
  async updatePost(
    @Request() req: RequestWithUser,
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
  ) {
    return await this.postService.updatePost(+id, req.user.id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Post has been deleted',
    type: MessageResponseDto,
  })
  async deletePost(@Request() req: RequestWithUser, @Param('id') id: string) {
    return await this.postService.deletePost(+id, req.user.id);
  }
}
