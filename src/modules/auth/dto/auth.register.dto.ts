import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly username: string;

  @ApiModelProperty()
  readonly password: string;
}
