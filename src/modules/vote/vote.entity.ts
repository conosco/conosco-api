import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { Topic } from '../topic/topic.entity';

@Entity('vote')
export class Vote {
  @ManyToOne(type => User, user => user.votes, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Topic, topic => topic.votes, { primary: true })
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column({ name: 'state', type: 'boolean' })
  state: boolean;
}
