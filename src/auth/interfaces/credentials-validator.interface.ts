/**
 * Injection token used to resolve the credentials validator implementation.
 * Kept separate from any concrete service so Passport strategies stay
 * agnostic to specific application services.
 */
export const CREDENTIALS_VALIDATOR = 'CREDENTIALS_VALIDATOR';

/**
 * Contract that any credentials validator must implement in order to be
 * used by Passport strategies (e.g. LocalStrategy). This keeps the
 * strategy decoupled from concrete service implementations.
 */
export interface CredentialsValidator {
  validate(email: string, password: string): Promise<any> | any;
}
