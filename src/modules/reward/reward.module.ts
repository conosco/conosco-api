import { Module } from '@nestjs/common';
import { Reward } from './reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module(
    { 
        // imports: [TypeOrmModule.forFeature([Reward])] 
    }
    )
export class RewardModule {}
