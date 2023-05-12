const Thoughts = require("../models/thought");
const User = require("../models/user");

module.exports = {
  //GET TO GET ALL THOUGHTS
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET TO GET A SINGLE THOUGHT BY ITS _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //POST TO CREATE A NEW THOUGHT  (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createNewThought(req, res) {
    try {
      const newThought = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: "Thought created, but no user found with that Id.",
        });
      }
      res.json(newThought);
    } catch (err) {
      console.error(err);
    }
  },
  //PUT TO UPDATE A THOUGHT BY ITS _id
  //DELETE TO REMOVE A THOUGHT BY ITS _id
  //POST TO CREATE A REACTION STORED IN A SINGLE THOUGHT'S reactions ARRAY FIELD
  //DELETE TO PULL AND REMOVE A REACTION BY THE REACTION'S reactionId VALUE
};
