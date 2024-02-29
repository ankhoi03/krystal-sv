import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageResponseDto {
  @ApiProperty({
    type: String,
    description: 'Message of the response',
    example: 'This is a message response 💕',
  })
  @IsString()
  message: string;
}
