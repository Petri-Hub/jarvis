export abstract class PasswordService {
  abstract hash(password: string): Promise<{ hash: string; salt: string }>;
  abstract verify(password: string, salt: string, storedHash: string): Promise<boolean>;
}