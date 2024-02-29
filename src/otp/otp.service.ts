import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OtpService {
  constructor(private readonly prismaService: PrismaService) {}

  async generateOtp(email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);

    const validUntil = new Date();
    validUntil.setMinutes(validUntil.getMinutes() + 5);

    await this.prismaService.otp.create({
      data: {
        secret: hashedOtp,
        validUntil,
        email,
      },
    });

    return otp;
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const otpRecord = await this.prismaService.otp.findFirst({
      where: {
        email,
      },
    });

    if (!otpRecord) {
      return false;
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.secret);
    if (!isMatch) {
      return false;
    }

    const now = new Date();
    if (now > otpRecord.validUntil) {
      return false;
    }

    // Delete the OTP record after it has been verified
    await this.prismaService.otp.delete({
      where: {
        id: otpRecord.id,
      },
    });

    return true;
  }
}
