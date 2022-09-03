const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find().then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate({
            path: "thoughts",
            select: "__v"
        }).then((user) => 
        !user
        ? res.status(404).json({ message: "No users found with this id." }): res.json(user)
        ).catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((user) => 
        !user
        ? res.status(404).json({ message: "No users found with this id" }): res.json(user)
        ).catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: "No users found with this id" }): Thought.findOneAndUpdate(
            { thought: req.params.thoughtId },
            { $pull: { students: req.params.thoughtId } },
            { new: true }
        )
        ).then((thought) =>
        !thought
        ? res.status(404).json({ message: "This user was deleted. Thoughts can't be found.",}): res.json({ message: "this user was deleted." })
        ).catch((err) => res.status(500).json(err));
    },
};