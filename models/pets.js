const mongoose = require('mongoose');

const petHobbySchema = new mongoose.Schema({
    fav: String,
    leastFav: String
})

const myPetsSchema = new mongoose.Schema({
    name: String,
    age: Number,
    species: String,
    location: String,
    hobbies: [petHobbySchema]
})


const MyPets = mongoose.model('MyPets', myPetsSchema);

module.exports = MyPets;