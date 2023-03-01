

const thoughtSchema = new mongoose.Schema({

    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (timestamp) {
            return new Date(timestamp).toLocaleString();
        }
    },
    username: {
        type: String,
        required: true,
        ref: `User`
        // use VVVVV if needed to populate the field with a certain item
        // Thought.find().populate('username').exec(function(err, thoughts) {
        // });
    },
    reactions: [reactionSchema]
});

const Thought = model('thought', userSchema)

User.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

module.exports = Thought;

