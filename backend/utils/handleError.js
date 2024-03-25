const handleError = (code, message) => {
    const err = new Error(message);
    err.status = 'fail';
    err.statusCode = code;
    return err;
}

module.exports = handleError;