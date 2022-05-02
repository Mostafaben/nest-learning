import { Injectable } from '@nestjs/common';
import { SignUpResponse } from './user.controller';
import { User as UserModel } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private readonly _KEY: string = 'mostafa benlagha';
  private readonly _REFRESH_KEY: string = 'benlagha';
  private readonly _EXPIRES_IN: number = 1000 * 60 * 60 * 24;
  constructor(private jwtService: JwtService) {}

  generateTokens({ email, id }: UserModel): SignUpResponse {
    return {
      accessToken: this.generateAccessToken(email, id),
      refreshToken: this.generateRefreshToken(email, id),
      expiresIn: this._EXPIRES_IN,
    };
  }
  generateAccessToken(email: string, id: number): string {
    return this.jwtService.sign(
      {
        email,
        id,
      },
      { secret: this._KEY, expiresIn: this._EXPIRES_IN },
    );
  }
  generateRefreshToken(email: string, id: number): string {
    return this.jwtService.sign(
      {
        email,
        id,
      },
      { secret: this._REFRESH_KEY },
    );
  }
}
