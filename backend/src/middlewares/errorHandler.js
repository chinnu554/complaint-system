const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    const message = statusCode === 500 ? "Internal server error" : err.message;

    console.error(err);

    res.status(statusCode).json({
        message,
        success: false,
        ...(process.env.NODE_ENV !== "production" && { error: err.message })
    });
};

export default errorHandler;