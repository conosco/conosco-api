import { ApiModelProperty } from '@nestjs/swagger';

export class PayloadDTO {
  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  firstName: string;

  @ApiModelProperty()
  lastName: string;

  @ApiModelProperty()
  profilePic: string;

  @ApiModelProperty()
  iat?: number;

  @ApiModelProperty()
  expiresIn?: string;
}
