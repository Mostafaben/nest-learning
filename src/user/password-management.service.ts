import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PasswordManagementService {
  private readonly _ROUNDS: number = 10;
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, this._ROUNDS);
  }
}
