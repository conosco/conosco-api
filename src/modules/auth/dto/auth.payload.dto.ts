import { ApiModelProperty } from '@nestjs/swagger';

export class PayloadDTO {
  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  iat?: number;

  @ApiModelProperty()
  expiresIn?: string;
}
