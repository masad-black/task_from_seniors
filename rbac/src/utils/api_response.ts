class Response {
  statusCode: number;
  message: string;
  data: any;

  constructor(statusCode: number, message: string, data: any) {
    this.statusCode = statusCode;

    if (message !== null) {
      this.message = message;
    }

    if (data) {
      this.data = data;
    }
  }
}

export default Response;
