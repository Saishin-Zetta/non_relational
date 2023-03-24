const { User, Thought } = require('../models'); 



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
        User.deleteOne()
            .then(({ thoughts }) => {
                return Thought.updateMany(
                    { _id: { $in: thoughts } },
                    { $pull: { reactions: { username: req.params.userId } } },
                    { new: true }
                );
            })
            .then(() => {
                return User.findOneAndDelete({ _id: req.params.userId });
            })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with that ID' });
                }
                else {
                    res.json({ message: 'User was successfully deleted' })
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // add friends
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true },
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User cannot add friend, because they or the user they want to add does not exist.' })
                }
                res.json({ message: 'Friend was successfully added' })
            })

    },

    // remove friends
    removeFriend(req, res) {
        User.findById(req.params.userId)
            // calling the found user current_user and passing it through the process
            .then((current_user) => {
                if (!current_user) {
                    res.status(404).json({ message: 'User not found' });
                }
                else {
                    // pull is what allows us to take something out of an array. In this case, our friends_list
                    current_user.friends.pull(req.params.friendId)
                    return current_user.save()
                }
            })
            .then((current_user) => {
                res.json({ message: 'Friend was successfully removed' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
} 