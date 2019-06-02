import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class JoinDTO {
  @ApiModelProperty()
  @IsNumber()
  userId: number;
}