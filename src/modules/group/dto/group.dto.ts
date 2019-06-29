import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsArray, IsOptional } from 'class-validator';
import { Messages } from '../../../consts/messages/messages.portuguese';
import { IsNotBlank } from '../../../common/pipes/validation/is-not-blank.validation';
import { Habit } from '../../habit/habit.entity';

export class GroupDTO {
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

  @ApiModelProperty({isArray: true, type: Habit})
  @IsArray()
  @IsOptional()
  readonly habits: Array<Habit>;
}