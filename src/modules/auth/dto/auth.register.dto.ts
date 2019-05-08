import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiModelProperty()
  readonly firstName: string;

  @ApiModelProperty()
  readonly lastName: string;

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly profilePic: string;

  @ApiModelProperty()
  readonly facebookToken: string;
}
