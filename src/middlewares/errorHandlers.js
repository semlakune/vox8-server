const errorHandler = (err, req, res, next) => {
    // console.log(err.name)
    let code = 500;
    let message = "Internal Server Error";

    if (err.name === "not_found" || err.message === "Request failed with status code 404") {
        code = 404
        message = "Not Found"
    }

    res.status(code).json({ message });
};

module.exports = {
    errorHandler,
};