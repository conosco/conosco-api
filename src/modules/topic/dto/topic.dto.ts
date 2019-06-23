import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { User } from '@kl/modules/user/user.entity';

export class TopicDTO {
  @ApiModelProperty()
  @IsNumber()
  userId: number;

  @ApiModelProperty()
  @IsNumber()
  topicTypeId: number;

  @ApiModelProperty()
  @IsString()
  title: string;

  @ApiModelProperty()
  @IsString()
  text: string;

  @ApiModelProperty()
  @IsString()
  imageUrl: string;
  
  @IsNumber()
  @IsOptional()
  groupId: number;
}
