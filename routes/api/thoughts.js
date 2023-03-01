const router = require('express').Router();
// all the functions are listed on the parsed out routes
const {
    getThoughts,
    getSingleThought,

    
} = require('../../controllers/thoughtControllers')


// // /api/users
router.route('/').get().post(createUser);

// // /api/users/:userId
// router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// // /api/users/:userId/friends/friendId
router.route('/:thoughtId/user/:userId')