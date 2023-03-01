const { User, Thought } = require('../../models')


module.exports = {

    // Get all Users
    getUsers(req, res) {
        User
            .find()
            .then((users) => res.json(users))
        // .toArray((err, results) => {
        //     if(err) throw err;
        //     res.send(results);
        // });
    },

    // Get a single User
    getSingleUser(req, res) {
        // find a user by it's Id
        User.findById(req.params.userId)
            // populate the thoughts portion of User
            .populate('thoughts')
            // populate the friends portion of User
            .populate('friends')
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with that ID' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // create a User
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // update a User
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user with this ID exist' })
                }
                res.json(user)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // delete a User
    deleteUser(req, res) {
        User.findOneAndRemove(
            { _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    Thought.findOneAndUpdate(
                        { username: req.params.userId },
                        { $pull: { username: req.params.userId } },
                        { new: true }
                    )
                }
            })
            .then((user) => {
                if (!thought) {
                    res.status(404).json({ message: 'User deleted, but no thoughts found' })
                }
                res.json({ message: 'User was successfully deleted' })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // add friends
    addFriend(req, res) {
        const adding = User.findOneAndUpdate(
            { _id: req.params.userId },
            { friends: req.params.friendId },
            // useFindAndModify allows us to use the native function instead of deprecated findAndModify()
            { new: true, useFindAndModify: false },
        )
            .then((adding) => {
                if (!adding) {
                    res.status(404).json({ message: 'User cannot add friend, because they or the user they want to add does not exist.' })
                }
                res.json({ message: 'User was successfully added as a friend' })
            })

    },

    // remove friends
    removeFriend(req, res) {
        const current_user = User.findById(req.params.userId)
        // populate the friends portion of User
        .populate('friends')
        current_user.findOneAndRemove(
            { friend: req.params.friendId },
            { new: true, useFindAndModify: false }
        )
        .then((current_user) => {
            if (!current_user) {
                res.status(404).json({ message: 'User cannot remove friend, because they or the user they want to add does not exist.' })
            }
            res.json({ message: 'User was successfully removed as a friend' })
        })
    }
}