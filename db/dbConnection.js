const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/apiDbdenemelerim")
  .then(() => console.log("veri tabanına baglandım"))
  .catch(err=>console.log(err));
