import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterFacebookDTO {
  @ApiModelProperty()
  readonly facebookToken: string;
}
