const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
  },
  thoughts: [{
    type: Schema.Types.ObjectId, ref: 'Thought' 
  }],
  friends: [{
    type: Schema.Types.ObjectId, ref: 'User' 
  }],
  //  $push
},
{
  toJSON: {
    getters: true,
    virtuals: true
  },
  id: false
}
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Think of this like a patent
const User = model('User', userSchema)





module.exports = User;

