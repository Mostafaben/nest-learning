import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User as UserModel } from '@prisma/client';
import { SignUpResponse } from './user.controller';

export type jwtPayload = {
  email: string;
  id: number;
  exp?: number;
  iat?: number;
};

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

  validateToken(token: string): jwtPayload | null {
    return this.jwtService.verify(token, { secret: this._KEY });
  }
}
