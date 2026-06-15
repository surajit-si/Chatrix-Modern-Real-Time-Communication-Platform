class ApiResponse {
  constructor(statusCode = 200, data, message = "operation successful") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export default ApiResponse;
