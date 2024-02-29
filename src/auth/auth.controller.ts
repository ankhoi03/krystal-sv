import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SendOTPDto, VerifyOTPDto, VerifyOTPResponseDto } from './auth.dto';
import { MessageResponseDto } from '../utils/global.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'OTP sent successfully',
    type: MessageResponseDto,
  })
  async sendOTP(@Body() sendOTPDto: SendOTPDto) {
    return await this.authService.sendOTP(sendOTPDto.email);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User Information and token',
    type: VerifyOTPResponseDto,
  })
  async verifyOTP(@Body() verifyOtpDto: VerifyOTPDto) {
    return await this.authService.verifyOTP(
      verifyOtpDto.email,
      verifyOtpDto.otp,
    );
  }
}
