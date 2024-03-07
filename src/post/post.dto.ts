import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  media?: string[];

  @ApiProperty({
    example: '2021-08-24T00:00:00.000Z',
    description: 'The created date of the post',
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: '2021-08-24T00:00:00.000Z',
    description: 'The updated date of the post',
  })
  @IsNotEmpty()
  updatedAt: Date;
}
