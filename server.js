const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { Registration, LoginUser, Train } = require('./database'); // Adjust the path to models directory

const app = express();


mongoose
    .connect('mongodb://localhost:27017/trainbookingwebsite', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: '1107', 
        resave: false,
        saveUninitialized: true,
    })
);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 


app.post('/registration', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        
        const newUser = new Registration({
            ...req.body,
            password: hashedPassword,
        });
        await newUser.save();
        
        const newLogin = new LoginUser({
            username: req.body.username,
            password: hashedPassword,
        });
        await newLogin.save();

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const user = await LoginUser.findOne({ username: req.body.username });
        if (!user) return res.status(400).send('Invalid username or password');

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).send('Invalid username or password');

        req.session.loggedin = true;
        req.session.username = user.username;
        res.redirect('/trains');
    } catch (err) {
        console.error(err);
        res.status(500).send('Login error');
    }
});

// Trains route
app.get('/trains', async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching trains');
    }
});

// Search trains
app.post('/search', async (req, res) => {
    try {
        const { fromCity, toCity, travelDate, class_opt } = req.body;
        const results = await Train.find({
            departureCity: fromCity,
            arrivalCity: toCity,
            departureDate: travelDate,
            classes: class_opt,
        });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Search error');
    }
});

// Start server
const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
