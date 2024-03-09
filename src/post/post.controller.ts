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
  Get, Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PostService } from './post.service';
import {
  CreatePostDto,
  LikeResponseDto,
  PostResponseDto,
  UpdatePostDto,
} from './post.dto';
import { RequestWithUser } from '../auth/auth.interface';
import { MessageResponseDto } from '../utils/global.dto';
import { LikeService } from '../like/like.service';
import { UserSummaryDTO } from '../user/user.dto';

@ApiTags('Post')
@Controller('post')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostController {
  constructor(
    private postService: PostService,
    private likeService: LikeService,
  ) {}

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

  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Post has been liked',
    type: LikeResponseDto,
  })
  async likePost(@Request() req: RequestWithUser, @Param('id') id: string) {
    return await this.likeService.likePost(+id, req.user.id);
  }

  @Get(':id/likes')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Post has been liked by users',
    type: UserSummaryDTO,
    isArray: true,
  })
  async getPostLikes(
    @Param('id') id: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return await this.likeService.getPostLikes(+id, { skip, take });
  }
}
