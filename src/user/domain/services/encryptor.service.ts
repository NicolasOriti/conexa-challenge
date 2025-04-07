export interface EncryptorService {
  hash(password: string): string;
  compare(plain: string, hash: string): boolean;
}
