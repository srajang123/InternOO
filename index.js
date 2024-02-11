const express = require('express');
const internships = require('./proxies/fetch-internships');
const users = require('./db/user');
//Imports above this

const app = express();
const PORT = 5000 || process.env.PORT;

app.get('/',(req, res) => {
    res.send("Hello");
});

app.get('/internship/fetch/', (req, res) => {
    res.json(internships.fetchInternships());
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

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});