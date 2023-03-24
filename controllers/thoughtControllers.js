const { User, Thought, reactionSchema } = require('../models')


module.exports = {

    // Get all thoughts
    getThoughts(req, res) {
        Thought
            .find()
            .then((thoughts) => res.json(thoughts))
    },

    // Get a single thought
    getSingleThought(req, res) {
        // find a user by it's Id
        Thought.findById(req.params.thoughtId)
            // populate the user portion of thoughts
            .populate('user')
            .then((thoughts) => {
                if (!thoughts) {
                    return res.status(404).json({ message: 'No thought found with that ID' });
                }
                res.json(thoughts);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },


    // Create a new thought 
    createThought(req, res) {
        try {
            // Create a new thought using the request body
            const newThought = Thought.create(req.body);

            // Find the user with the associated username
            const currentUser = User.findOne({ username: req.body.username });

            if (!currentUser) {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }            
            // Push the thought's _id to the user's thoughts array
            currentUser.thoughts.push(newThought._id);

            // Save the updated user
            currentUser.save();

            // Return the created thought
            return res.status(201).json(newThought);
    },

    // updating thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }

            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought with this ID exist' })
                }
                res.json(thought)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    )},
 
    // delete thought
    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.thoughtId)
            .then((deletedThought) => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with that ID' });
                }
                res.json(deletedThought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    


}