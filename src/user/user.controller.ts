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
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateProfileDto, UserResponseDto } from './user.dto';
import { RequestWithUser } from '../auth/auth.interface';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
