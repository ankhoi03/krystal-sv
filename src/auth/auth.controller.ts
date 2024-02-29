import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SendOTPDto, VerifyOTPDto } from './auth.dto';
import { HttpResponse } from '../utils/http-response';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'OTP sent successfully' })
  async sendOTP(@Body() sendOTPDto: SendOTPDto) {
    const response = await this.authService.sendOTP(sendOTPDto.email);
    return new HttpResponse(response);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'OTP verified successfully' })
  async verifyOTP(@Body() verifyOtpDto: VerifyOTPDto) {
    const response = await this.authService.verifyOTP(
      verifyOtpDto.email,
      verifyOtpDto.otp,
    );
    return new HttpResponse(response);
  }
}
