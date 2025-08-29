class ApiResponse {
  static success(res, data = {}, message = "Success", statusCode = 200) {
    if (Object.keys(data).length > 0) {
      return res.json({
        statusCode,
        success: true,
        message,
        data,
      });
    }

    return res.json({
      statusCode,
      success: true,
      message,
    });
  }

  static error(
    res,
    message = "Something went wrong",
    statusCode = 500,
    errors = null
  ) {
    return res.json({
      statusCode,
      success: false,
      message,
      errors,
    });
  }
}

export default ApiResponse;
