import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Messages } from '../../../consts/messages/messages.portuguese';
import { IsNotBlank } from '@kl/common/pipes/validation/is-not-blank.validation';

export class HabitDTO {
  @ApiModelProperty()
  @IsString({ message: Messages.error.INVALID_FORMAT })
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  readonly name: string;

  @ApiModelProperty()
  @IsString({ message: Messages.error.INVALID_FORMAT })
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  readonly description: string;

  @ApiModelProperty()
  @IsString({ message: Messages.error.INVALID_FORMAT })
  @IsNotBlank(null, { message: Messages.error.EMPTY_FIELD })
  readonly iconUrl: string;
}