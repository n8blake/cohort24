const generateEmail = require("../../utils/EmailGenerator");
const generateToken = require("../../utils/AppleTokenGenerator");
const router = require("express").Router();

// require routes files
router.get("/emailpreview", function(req, res){
  const email = generateEmail("link");
  res.send(email);
});

router.get("/activeUserJWT", function (req, res) {
  //console.log(req.session);
  let token;
  if(req.session.passport?.user.id){
    token = generateToken({ id: req.session.passport.user.id }, 24);
  } else {
    token = "user not logged in";
  }
  res.json({token});
});

// export
module.exports = router;
