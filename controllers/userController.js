const { User, Thought } = require("../models");

module.exports = {
  // all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // single user
  async getsUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).populate(
        "thoughts",
        "friends"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // post a user
  async postUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this id." });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user
  async deleteUser(req, res) {
    try {
      const user = await findOneAndDelete({ _id: req.params.id });

      if (!user) {
        res.status(404).json({ message: "No user with this id." });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and thoughts deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this id." });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndDelete(
        { _id: req.params.userId },
        { $pull: { friends: { _id: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this id." });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
