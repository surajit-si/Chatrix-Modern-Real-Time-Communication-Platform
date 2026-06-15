class ApiError extends Error {
  constructor(statusCode, errMessage = "something went wrong", err) {
    super(errMessage);
    this.statusCode = statusCode;
    this.message = errMessage;
    this.err = err ? err : errMessage;
  }
}

export default ApiError;
