class ApiResponse {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;

    if (data) {
      this.data = data;
    }
  }
}

module.exports = ApiResponse;
