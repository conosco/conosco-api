import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { Messages } from '../../../consts/messages/messages.portuguese';
import { IsNotBlank } from '@kl/common/pipes/is-not-blank.validator';

export class RegisterDTO {
  @ApiModelProperty()
  @IsString({ message: Messages.error.VALIDATION_NOT_STRING })
  @IsNotBlank(null, { message: Messages.error.VALIDATION_NOT_EMPTY })
  readonly firstName: string;

  @ApiModelProperty()
  @IsString({ message: Messages.error.VALIDATION_NOT_STRING })
  @IsNotBlank(null, { message: Messages.error.VALIDATION_NOT_EMPTY })
  readonly lastName: string;

  @ApiModelProperty()
  @IsEmail({}, { message: Messages.error.VALIDATION_NOT_EMAIL })
  @IsNotBlank(null, { message: Messages.error.VALIDATION_NOT_EMPTY })
  readonly email: string;

  @ApiModelProperty()
  @IsString({ message: Messages.error.VALIDATION_NOT_STRING })
  @IsNotBlank(null, { message: Messages.error.VALIDATION_NOT_EMPTY })
  readonly password: string;

  @ApiModelProperty()
  @IsString({ message: Messages.error.VALIDATION_NOT_STRING })
  @IsNotBlank(null, { message: Messages.error.VALIDATION_NOT_EMPTY })
  readonly profilePic: string;

  @ApiModelProperty()
  @IsString({ message: Messages.error.VALIDATION_NOT_STRING })
  @IsNotBlank(null, { message: Messages.error.VALIDATION_NOT_EMPTY })
  @IsOptional()
  readonly facebookToken: string;
}
