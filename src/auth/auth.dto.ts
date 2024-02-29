import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOTPDto {
  @ApiProperty({
    example: 'xuantrung447@gmail.com',
    description: 'Email của người dùng',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class VerifyOTPDto {
  @ApiProperty({
    example: 'xuantrung447@gmail.com',
    description: 'Email của người dùng',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Mã OTP',
  })
  @IsNotEmpty()
  otp: string;
}
