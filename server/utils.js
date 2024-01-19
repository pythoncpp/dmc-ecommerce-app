function createSuccessResponse(data) {
  return {
    status: 'success',
    data,
  }
}

function createErrorResponse(error) {
  return {
    status: 'error',
    error,
  }
}

function createResponse(error, data) {
  if (error) {
    return createErrorResponse(error)
  } else {
    return createSuccessResponse(data)
  }
}

module.exports = {
  createSuccessResponse,
  createErrorResponse,
  createResponse,
}
