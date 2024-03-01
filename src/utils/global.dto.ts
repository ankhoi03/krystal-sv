import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class MessageResponseDto {
  @ApiProperty({
    type: String,
    description: 'Message of the response',
    example: 'This is a message response 💕',
  })
  @IsString()
  message: string;
}

export class FilterQuery {
  @ApiProperty({
    type: Number,
    description: 'Skip number',
    example: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  skip: number;

  @ApiProperty({
    type: Number,
    description: 'Take number',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  take: number;
}
