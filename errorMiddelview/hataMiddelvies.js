const errorCatcher = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.json({
      mesaj:
        Object.keys(err.keyValue) +
        "için girdiginiz" +
        Object.values(err.keyValue) +
        "deger daha önce kullanılmış eklenemez yada güncellenmemez",

      errorCode: 400,
    });
  }
  if (err.code === 66) {
    res.json({
      mesaj: "id güncellenemez",
    });
  }
  res.status(err.statusCode || 500);
  res.json({
    errorCode: err.statusCode || 400,
    mesaj: err.message,
  });
};

module.exports = errorCatcher;
