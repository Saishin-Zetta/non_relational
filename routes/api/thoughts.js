const router = require('express').Router();
// all the functions are listed on the parsed out routes
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought  
} = require('../../controllers/thoughtControllers')


// // /api/users
router.route('/').get(getThoughts).post(createThought);

// // /api/users/:userId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// // /api/users/:userId/friends/friendId
router.route('/:thoughtId/reactions').post().delete()

module.exports = router