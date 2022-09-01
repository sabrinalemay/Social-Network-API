const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((Thought) => res.json(Thought))
            .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id' }): res.json(thought)
            ).catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                );
            }).then((user) =>

                !user
                    ? res.status(404).json({
                        message: 'Thought has been created. No users with this id found.',
                    }): res.json('Created the thought ')
            ).catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thoughts found with this id" }): res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thoughts found with this id" })
                    : User.findByIdAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            ).then((user) =>
                !user
                    ? res.status(404).json({ message: "Thought was deleted. No users found with this id." }): res.json({ message: "Thought has been deleted." })
            ).catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _is: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        ).then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thoughts found with this id" }) : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true.valueOf, new: true }
        ).then((thought) =>
            !thought
                ? res.status(404).json({ message: " No thoughts found with this id" }) : res.json(thought)
        ).catch((err) => res.status(505).json(err));
    },
};