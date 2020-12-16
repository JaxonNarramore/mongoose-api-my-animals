const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
// app.use(express.urlencoded())
// app.use(express.json())

const MyPets = require('./models/pets.js');
const { Router } = require('express');

mongoose.connect('mongodb://localhost/myAnimals', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log(`connected to MongoDB on ${db.host}:${db.port}`)
})

db.on('error', (err) => {
    console.log('Error', err)
})

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Home Route!');
});


app.get('/stella', (req, res) => {
    MyPets.create({
        name: 'Stella',
        age: 1,
        species: 'Tuxedo',
        location: 'Austin TX',
        hobbies:[]
    })
})

app.put("/stellahobbies", (req, res) => {
    MyPets.updateMany({name: 'Stella'}, {$set: {hobbies: [{fav: 'Being outside', leastFav: 'Being held'}]}})
    .then((hobbies)=> {
        res.status(200).json({ hobbies })
    })
})

app.get('/findstella', (req, res) => {
    MyPets.findOne({name: 'Stella'}).then((stella) => {
        res.status(200).json({ stella })
    })
})

app.delete('/deletepet', (req, res) => {
    MyPets.deleteMany().then(() => {
        console.log('Deleted!');
    })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});