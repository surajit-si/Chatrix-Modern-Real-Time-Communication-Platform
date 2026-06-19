class ApiError extends Error {
  constructor(statusCode, errMessage = "something went wrong", data, err) {
    super(errMessage);
    this.statusCode = statusCode;
    this.message = errMessage;
    this.data = data;
    this.err = err ? err : errMessage;
  }
}

export default ApiError;
