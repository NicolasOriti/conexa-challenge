export interface TokenService {
  sign(payload: Record<string, any>): string;
}
