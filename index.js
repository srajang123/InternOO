const express = require('express');
const internships = require('./proxies/fetch-internships');
const users = require('./db/user');
const otp = require('./db/otp');
//Imports above this

const app = express();
const PORT = 5000 || process.env.PORT;

app.get('/internship/fetch/', (req, res) => {
    internships.fetchInternships().then((data) => {
        res.json(data);
    });
});

app.get('/internship/apply/:internshipId', (req,res) => {
    var userId = req.query.userId;
    var internshipId = req.params.internshipId;
    users.applyInternship(userId, internshipId);
    res.send("Applied to internship");
});

app.get('/internship/applied', (req,res) => {
    var userId = req.query.userId;
    var appliedInternshipIds = users.fetchAppliedInternships(userId);
    var appliedInternships = appliedInternshipIds.map(appliedInternshipId => {
        return internships.fetchInternshipInformation(appliedInternshipId);
    });
    res.json(appliedInternships);
});

app.get('/user/otp/register/:email', (req, res) => {
    var email = req.params.email;
    res.json(otp.generateOtp(email));
});

app.get('/user/otp/verify/:email/:inputOTP', (req, res) => {
    var email = req.params.email;
    var inputOTP = req.params.inputOTP;
    res.json({
        isCorrectOTP: otp.verifyOtp(email, inputOTP)
    });
});

app.get('/*',(req, res)=> {
    res.status(404).send("Error 404 Not Found!!");
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});