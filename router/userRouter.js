const router = require("express").Router();
const Joi = require("@hapi/joi");
const auth = require("../errorMiddelview/authMiddleView");
const authAdmin = require("../errorMiddelview/adminMiddelView");
const userController = require("../controlles/userControlles");

router.get("/me", auth, userController.oturumAcanKullanıcıBilgilerim);


router.get("/", [auth, authAdmin], userController.tumUserslariListele);

router.patch("/me", auth, userController.kullaniciKendiBilgileriniGüncelleme);


// yeni kullanıcı kaydı
router.post("/",userController.yeniUserOlustur );

router.patch("/:id", async (req, res, next) => {
  delete req.body.createAt;
  delete req.body.updateAt; // bunlar güncellenemez
  
  if (req.body.hasOwnProperty("password")) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
  }

  const { error, value } = User.joiValidationForUpdate(req.body);
  if (error) {
    next(createError(400));
    console.log("kayıt hatası");
  } else {
    try {
      const result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (result) {
        return res.json(result);
      } else {
        return res.status(404).json({ mesaj: "Kullanıcı bulanamdı" });
      }
    } catch (error) {
      next(createError(error));
    }
  }
});


router.delete("/deleteAll", [auth, authAdmin],userController.adminToplusilme);


router.delete("/me", auth,userController.userkendinisilme);



router.delete("/:id", [auth, authAdmin], userController.AdminId);



router.post("/giris",userController.girisYap);

module.exports = router;
