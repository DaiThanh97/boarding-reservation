import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signUp.dto';
import { LoginResponse } from './interfaces/auth.interface';
import { JwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { username, password } = loginDto;
    const user = await this.usersService.getUserByUsername(username);

    // If valid
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        sub: user.id,
        username: user.username,
        phone: user.phone,
      };
      // Provision token
      const accessToken = this.jwtService.sign(payload);
      return {
        id: user.id,
        name: user.name,
        phone: user.phone,
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<boolean> {
    const { username, password, name, phone } = signUpDto;
    const user = await this.usersService.getUserByUsername(username);
    if (user) {
      throw new BadRequestException('Username is existed');
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await this.usersService.createUser({
      username,
      password: hashedPassword,
      name,
      phone,
    });

    return result;
  }
}
