const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createNewThought,
  updateOneThought,
  deleteThought,
  newReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getThoughts);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateOneThought)
  .delete(deleteThought);

router.route("/:userId").post(createNewThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(newReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// POST to create a reaction stored in a single thought's reactions array field

module.exports = router;
