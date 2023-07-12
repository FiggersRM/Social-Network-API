const router = require('express').Router();
const {
    getThoughts,
    getThought,
    postThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('./').get(getThoughts).post(postThought);

// /api/thoughts/:thoughtId
router.route('./:thoughtId').get(getThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('./:thoughtId/reactions').post(postReaction).delete(deleteReaction);

module.exports = router;