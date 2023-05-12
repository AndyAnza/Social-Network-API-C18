const Users = require("../models/user");

module.exports = {
  //GET ALL USERS
  async getUsers(req, res) {
    try {
      const users = await Users.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET A SINGLE USER BY ITS _id AND POPULATE THOUGHT AND FRIEND DATA
  async getSingleUser(req, res) {
    try {
      const user = await Users.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts");

      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //POST A NEW USER
  async createNewUser(req, res) {
    try {
      const newUser = await Users.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.error(err);
    }
  },
  //PUT TO UPDATE A USER BY ITS _id
  async updateOne(req, res) {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //DELETE TO REMOVE USER BY ITS _id
  async deleteUser(req, res) {
    try {
      const user = await Users.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with this id" });
      }
      res.json({ message: "user successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //POST TO ADD A NEW FRIEND TO A USER'S FRIEND LIST
  async addNewFriend(req, res) {
    try {
      const newFriend = await Users.findOne({ _id: req.params.friendId });
      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: newFriend._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: "Found no user or friend with that ID",
        });
      }
      res.json(`Added new Friend to User: ${user.username}!`);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //DELETE TO REMOVE A FRIEND FROMA  USER´S FRIEND LIST
  async deleteFriend(req, res) {
    try {
      const deleteFriend = await Users.findOneAndRemove({
        _id: req.params.friendId,
      });

      if (!deleteFriend) {
        return res.status(404).json({ message: "No friend with that id" });
      }

      const user = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      res.status(200).json({ message: "Friend deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
