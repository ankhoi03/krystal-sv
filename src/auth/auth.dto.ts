import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { UserResponseDto } from '../user/user.dto';

export class SendOTPDto {
  @ApiProperty({
    example: 'xuantrung447@gmail.com',
    description: 'Email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class VerifyOTPDto extends IntersectionType(SendOTPDto) {
  @ApiProperty({
    example: '123456',
    description: 'OTP of the user',
  })
  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class VerifyOTPResponseDto {
  @ApiProperty({
    type: UserResponseDto,
    description: 'User information',
  })
  user: UserResponseDto;

  @ApiProperty({
    type: String,
    description: 'Token of the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @IsString()
  token: string;
}
