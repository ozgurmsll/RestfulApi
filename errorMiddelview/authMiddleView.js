const jwt = require("jsonwebtoken");
const User = require("../models/users.js");

const aut = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    const sonuc = jwt.verify(token, "secretkey");

    req.user = await User.findById({ _id: sonuc._id });
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = aut;
