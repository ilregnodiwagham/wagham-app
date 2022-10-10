export class IllegalStateError extends Error {
  reason?: string;

  constructor(message: string, reason?: string) {
    super(message);
  }

}
