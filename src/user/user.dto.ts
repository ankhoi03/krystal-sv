import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class UserResponseDto {
  @ApiProperty({
    type: String,
    description: 'ID of the user',
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Email of the user',
    example: 'ankhoit528@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Username of the user',
    example: 'To An Khoi',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Avatar of the user',
    example: 'https://example.com/avatar.png',
  })
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    type: String,
    description: 'Background of the user',
    example: 'https://example.com/background.png',
  })
  @IsUrl()
  @IsOptional()
  background?: string;

  @ApiProperty({
    type: String,
    description: 'Description of the user',
    example: 'Khoi is a good boy 🥰',
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateProfileDto extends PartialType(
  OmitType(UserResponseDto, ['id', 'email']),
) {}

export class UserSummaryDTO extends OmitType(UserResponseDto, [
  'email',
  'background',
  'description',
]) {}

export class FollowParamsDTO {
  @ApiProperty({
    type: Number,
    description: 'Id of the user to follow or unfollow',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
