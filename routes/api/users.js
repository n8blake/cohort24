const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);

router.get("/currentIdentity", function (req, res) {
  if (req.session.userId) {
    req.params.id = req.session.userId;
    return usersController.findById(req, res);
  } else {
    res.status(401).send();
  }
});

router.post("/new", function(req, res){
  if(req.body.password && req.body.email && req.body.firstName && req.body.lastName){
    usersController.create(req, res);
  } else {
    res.status(400).json("Malformatted user request");
  }
});
router.route("/resetpassword").post(usersController.requestPasswordResetLink);

// Matches with /api/users/:id
router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);


router.route("/:id/password").put(usersController.updatePassword);

module.exports = router;
