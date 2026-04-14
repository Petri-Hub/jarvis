import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';
import * as bcrypt from 'bcrypt';
import { PasswordService } from '../../domain/services/password.service';

@Injectable()
export class BcryptPasswordService implements PasswordService {
  async hash(password: string): Promise<{ hash: string; salt: string }> {
    const salt = randomBytes(16).toString('hex');
    const hash = createHash('sha256').update(password + salt).digest('hex');
    const hashed = await bcrypt.hash(hash, 10);
    return { hash: hashed, salt };
  }

  async verify(password: string, salt: string, storedHash: string): Promise<boolean> {
    const hash = createHash('sha256').update(password + salt).digest('hex');
    return bcrypt.compare(hash, storedHash);
  }
}