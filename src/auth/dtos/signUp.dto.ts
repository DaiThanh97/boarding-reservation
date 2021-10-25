import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    type: String,
    description: 'username must contains 4-20 characters',
  })
  username!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  @ApiProperty({
    type: String,
    description: 'password must contains 8-32 characters',
  })
  password!: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name',
  })
  name!: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Phone number',
  })
  phone!: string;
}
