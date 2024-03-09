import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserSummaryDTO } from '../user/user.dto';

export class CreatePostDto {
  @ApiProperty({
    example: 'This is a post',
    description: 'The content of the post',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: ['https://example.com/image.jpg'],
    description: 'The media of the post',
  })
  media?: string[];
}

export class PostResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the post',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'This is a post',
    description: 'The content of the post',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: ['https://example.com/image.jpg'],
    description: 'The media of the post',
  })
  @IsOptional()
  @IsString({ each: true })
  media?: string[];

  @ApiProperty({
    example: '2021-08-24T00:00:00.000Z',
    description: 'The created date of the post',
  })
  @IsNotEmpty()
  @IsString()
  createdAt: Date;

  @ApiProperty({
    example: '2021-08-24T00:00:00.000Z',
    description: 'The updated date of the post',
  })
  @IsNotEmpty()
  @IsString()
  updatedAt: Date;

  @ApiProperty({
    type: UserSummaryDTO,
    description: 'The user who created the post',
  })
  user: UserSummaryDTO;

  @ApiProperty({
    example: 1,
    description: 'The num of likes of the post',
  })
  @IsOptional()
  @IsNumber()
  like?: number;

  @ApiProperty({
    example: 1,
    description: 'The num of comments of the post',
  })
  @IsOptional()
  @IsNumber()
  comment?: number;
}

export class UpdatePostDto {
  @ApiProperty({
    example: 'This is a post',
    description: 'The content of the post',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class LikeResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The num of likes of the post',
  })
  @IsNumber()
  @IsNotEmpty()
  like: number;
}

export class CommentResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The num of comments of the post',
  })
  @IsNumber()
  @IsNotEmpty()
  comment: number;
}
