import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { Messages } from '../../../consts/messages/messages.portuguese';
import { IsNotBlank } from '@kl/common/pipes/validation/is-not-blank.validation';

export class RegisterDTO {
  @ApiModelProperty()
  @IsString({ message: Messages.error.INVALID_FORMAT })
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  readonly firstName: string;

  @ApiModelProperty()
  @IsString({ message: Messages.error.INVALID_FORMAT })
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  readonly lastName: string;

  @ApiModelProperty()
  @IsEmail({}, { message: Messages.error.INVALID_FORMAT })
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  readonly email: string;

  @ApiModelProperty()
  @IsString({ message: Messages.error.INVALID_FORMAT })
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  readonly password: string;

  @ApiModelProperty()
  @IsString({ message: Messages.error.INVALID_FORMAT })
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  readonly profilePic: string;

  @ApiModelProperty()
  @IsString({ message: Messages.error.INVALID_FORMAT })
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  @IsOptional()
  readonly facebookToken: string;
}
