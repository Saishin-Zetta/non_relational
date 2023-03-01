const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
},
{
  toJSON: {
    getters: true
  },
  id: false
}
);


const User = model('user', userSchema)

User.virtual('friendCount').get(function () {
  return this.friends.length;
});



module.exports = User;

