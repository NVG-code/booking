function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res
    .status(500)
    .json({
      error:
        "Er is een fout opgetreden op de server, controleer uw verzoek alstublieft!",
    });
}

module.exports = { errorHandler };
