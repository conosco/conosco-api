import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { GroupModule } from './modules/group/group.module';
import { TopicModule } from './modules/topic/topic.module';
import { CommentModule } from './modules/comment/comment.module';
import { HabitModule } from './modules/habit/habit.module';
import { RewardModule } from './modules/reward/reward.module';
import { VoteModule } from './modules/vote/vote.module';
import { GroupController } from './modules/group/group.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    GroupModule,
    TopicModule,
    CommentModule,
    HabitModule,
    RewardModule,
    VoteModule,
  ],
  controllers: [AppController, AuthController, GroupController, ],
  providers: [AppService, AuthService],
})
export class AppModule {
  constructor(private connection: Connection) {
    Logger.log(
      // tslint:disable-next-line: no-string-literal
      `Database connection initialized at: ${connection.options['host']}:${
        // tslint:disable-next-line: no-string-literal
        connection.options['port']
      }`,
      'Database',
    );
  }
}
