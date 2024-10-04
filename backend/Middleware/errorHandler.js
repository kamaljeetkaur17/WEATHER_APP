const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 500;  
    const message = error.message || 'Internal Server Error';
  
    
    console.error(`Error: ${message}, Status Code: ${statusCode}`);
  
    
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  };
  

  module.exports = errorHandler;