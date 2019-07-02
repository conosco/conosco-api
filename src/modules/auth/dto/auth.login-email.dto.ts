import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Messages } from '../../../consts/messages/messages.portuguese';
import { IsNotBlank } from '../../../common/pipes/validation/is-not-blank.validation';

export class LoginDTO {
  @ApiModelProperty()
  @IsEmail({}, { message: Messages.error.INVALID_FORMAT })
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  readonly email: string;

  @ApiModelProperty()
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  readonly password: string;
}
