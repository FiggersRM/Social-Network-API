const router = require('express').Router();
const {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController.js');

//api/users
router.route('/').get(getUsers).post(postUser);

// api/users/userId
router.route('./:userId').get(getUser).put(updateUser).delete(deleteUser);

// api/users/:userId/friends/:friendId
router.route('./:userId/friends/:friendId').put(addFriend).delete(deleteFriend);

module.exports = router;

