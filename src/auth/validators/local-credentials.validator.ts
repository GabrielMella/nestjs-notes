import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CredentialsValidator } from '../interfaces/credentials-validator.interface';

/**
 * Adapter that encapsulates the authentication logic behind the
 * CredentialsValidator contract. Passport strategies depend only on this
 * contract (via the CREDENTIALS_VALIDATOR injection token), never on
 * AuthService directly, keeping them agnostic to concrete service
 * implementations.
 */
@Injectable()
export class LocalCredentialsValidator implements CredentialsValidator {
  constructor(private readonly authService: AuthService) {}

  async validate(email: string, password: string) {
    return this.authService.authenticate({ email, password });
  }
}
