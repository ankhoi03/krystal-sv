import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';
import { OtpModule } from '../otp/otp.module';
import { UserModule } from '../user/user.module';
import { MediaModule } from '../media/media.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    EmailModule,
    OtpModule,
    UserModule,
    MediaModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
