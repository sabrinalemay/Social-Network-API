const { User } = require('../models');

module.exports = {
    addFriend(req, res) {
        console.log("New friend has been added!");
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        ).then((user) => 
        !user
        ? res 
        .status(404)
        .json({ message: 'No user found with this id' })
        : res.json(user)
        ).catch((err) => res.status(500).json(err));
    },
    deleteFriends(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.deleteFriendsId } },
            { runValidators: true, new: true }
        ).then((user) =>
        !user
        ? res
        .status(404)
        .json({ message: 'No user found with this id'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};