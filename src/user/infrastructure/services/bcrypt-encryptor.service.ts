import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { EncryptorService } from '@src/user/domain/services/encryptor.service';

@Injectable()
export class BcryptEncryptorService implements EncryptorService {
  hash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  compare(plain: string, hash: string): boolean {
    return bcrypt.compareSync(plain, hash);
  }
}
