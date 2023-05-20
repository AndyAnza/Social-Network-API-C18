// await user.find({});
const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createNewUser,
  updateOne,
  deleteUser,
  addNewFriend,
  deleteFriend,
} = require("../../controllers/usersController");

// /api/user
router.route("/").get(getUsers).post(createNewUser);

// /api/user/:userId
router.route("/:userId").get(getSingleUser).put(updateOne).delete(deleteUser);

// /api/user/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addNewFriend)
  .delete(deleteFriend);

module.exports = router;
