const router = require('express').Router(); 
// all the functions are listed on the parsed out routes
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userControllers')


// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// /api/users/:userId/friends/friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router