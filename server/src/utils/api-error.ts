import status from '../constants/status';

class ApiError extends Error {
  status: number;
  errors: string;
  message: string;

  constructor(status, message, errors) {
    super();
    this.status = status;
    this.errors = errors;
    this.message = message;
  }

  static UnauthorizedError(message: string, errors = []) {
    return new ApiError(status.UNAUTHORIZED, message, errors);
  }

  static ForbiddenError(message: string, errors = []) {
    return new ApiError(status.FORBIDDEN, message, errors);
  }
  static BadRequestError(message: string, errors = []) {
    return new ApiError(status.BAD_REQUEST, message, errors);
  }
}

export default ApiError;
