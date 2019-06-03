import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SubscriptionDTO {
  @ApiModelProperty()
  @IsNumber()
  userId: number;
}
