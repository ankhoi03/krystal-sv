import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  FollowParamsDTO,
  UpdateProfileDto,
  UserResponseDto,
  UserSummaryDTO,
} from './user.dto';
import { RequestWithUser } from '../auth/auth.interface';
import { FilterQuery, MessageResponseDto } from '../utils/global.dto';
import { FollowService } from '../follow/follow.service';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private userService: UserService,
    private followService: FollowService,
  ) {}

  @Get(':id/profile')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User Information',
    type: UserResponseDto,
  })
  async getProfile(@Param('id') id: string) {
    return await this.userService.getProfileById(+id);
  }

  @Post('update-profile')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'OTP sent successfully',
    type: UserResponseDto,
  })
  async updateProfile(
    @Request() req: RequestWithUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.userService.updateProfile(+req.user.id, updateProfileDto);
  }

  @Post('follow')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Followed successfully',
    type: MessageResponseDto,
  })
  async follow(
    @Request() req: RequestWithUser,
    @Body() followParams: FollowParamsDTO,
  ) {
    return await this.followService.follow(+req.user.id, followParams.userId);
  }

  @Post('unfollow')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Unfollowed successfully',
    type: MessageResponseDto,
  })
  async unfollow(
    @Request() req: RequestWithUser,
    @Body() followParams: FollowParamsDTO,
  ) {
    return await this.followService.unfollow(+req.user.id, followParams.userId);
  }

  @Get(':id/followers')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Followers fetched successfully',
    type: UserSummaryDTO,
    isArray: true,
  })
  async getFollowers(
    @Param('id') id: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return await this.followService.getFollowers(+id, { skip, take });
  }

  @Get(':id/following')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Following fetched successfully',
    type: UserSummaryDTO,
    isArray: true,
  })
  async getFollowing(
    @Param('id') id: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return await this.followService.getFollowing(+id, { skip, take });
  }
}
