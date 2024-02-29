import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from '../otp/otp.service';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private otpService: OtpService,
    private emailService: EmailService,
    private userService: UserService,
  ) {}

  async sendOTP(email: string) {
    const otp = await this.otpService.generateOtp(email);
    await this.emailService.sendOTPEmail(email, {
      otp,
      date: new Date().toDateString(),
    });

    return {
      message: `OTP sent to ${email} successfully!`,
    };
  }

  async verifyOTP(email: string, otp: string) {
    const isVerified = await this.otpService.verifyOtp(email, otp);
    if (!isVerified) {
      throw new UnauthorizedException('Invalid OTP');
    } else {
      let user = await this.userService.findOneByEmail(email);

      if (!user) {
        user = await this.userService.createUser(email);
      }
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      const token = await this.jwtService.signAsync(payload);
      return {
        token,
        user,
      };
    }
  }
}
