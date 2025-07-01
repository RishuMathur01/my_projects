const mongoose = require('mongoose');


const registrationSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: Number, required: true },
    country: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
});


const loginUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const trainSchema = new mongoose.Schema({
    trainName: { type: String, required: true },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    departureDate: { type: Date, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    durationHours: { type: Number, required: true },
    classes: { type: String, required: true },
    price: { type: Number, required: true },
});

const Registration = mongoose.model('Registration', registrationSchema);
const LoginUser = mongoose.model('LoginUser', loginUserSchema);
const Train = mongoose.model('Train', trainSchema);

module.exports = { Registration, LoginUser, Train };
