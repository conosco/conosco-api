import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TopicDTO {
  @ApiModelProperty()
  @IsNumber()
  userId: number;

  @ApiModelProperty()
  @IsNumber()
  groupId: number;

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
  imgUrl: string;
}
