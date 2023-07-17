const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v').populate({ path: 'reactions', select: '-__v' });
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single thought
    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v').populate({ path: 'reactions', select: '-__v' });

            if(!thought) {
                return res.status(404).json({ message: "No thought with this id." })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // post thought
    async postThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true}
            );
            if (!user) {
                res.status(404).json({ message: "No user found with that username" })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "No thought with this id." })
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message:"No thought with this id." })
            }
            res.json({ message: "Thought deleted" })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // post a reaction
    async postReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            );
            if(!thought) {
                res.status(404).json({ message: "No thought with this id." })
            }
            res.json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true}
            );

            if(!thought) {
                res.status(404).json({ message: "No thought with this id." })
            };

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}