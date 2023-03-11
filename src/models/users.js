const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    age: String,
    posts: [],
});

module.exports = mongoose.model('User', userSchema);