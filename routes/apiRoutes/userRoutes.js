const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

const {addFriend, deleteFriends} = require('../../controllers/friendsController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);
router.route('/addFriend/:userId').post(addFriend);
router.route('/:userId/deleteFriends/:deleteFriendsId').delete(deleteFriends);

module.exports = router;