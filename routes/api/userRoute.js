// await users.find({});
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

// /api/users
router.route("/").get(getUsers).post(createNewUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateOne).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addNewFriend)
  .delete(deleteFriend);

module.exports = router;
