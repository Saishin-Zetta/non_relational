const { User, Thought } = require('../../models')

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
        const newThought = Thought.create(req.body)
        newThought.populate('user')
        
            .then((newThought) => (newThought))
            .catch((err) => res.status(500).json(err));
    }
}