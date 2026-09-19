export interface FieldIssue {
  field: string;
  message: string;
}

/**
 * Erreur maitrisee, destinee a etre renvoyee au client.
 * Tout ce qui n'est pas une AppError est considere comme un incident interne :
 * le detail reste dans les journaux, le client recoit un message generique.
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details: FieldIssue[];

  constructor(statusCode: number, code: string, message: string, details: FieldIssue[] = []) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  static badRequest(message: string, details: FieldIssue[] = []): AppError {
    return new AppError(400, 'VALIDATION_ERROR', message, details);
  }

  static tooManyRequests(message: string): AppError {
    return new AppError(429, 'RATE_LIMITED', message);
  }

  static notFound(message: string): AppError {
    return new AppError(404, 'NOT_FOUND', message);
  }

  static serviceUnavailable(message: string): AppError {
    return new AppError(503, 'SERVICE_UNAVAILABLE', message);
  }
}
