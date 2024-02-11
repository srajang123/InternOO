const express = require('express');
const internships = require('./proxies/fetch-internships');
//Imports above this

const app = express();
const PORT = 5000 || process.env.PORT;

app.get('/',(req, res) => {
    res.send("Hello");
});

app.get('/fetch/internships', (req, res) => {
    res.json(internships.fetchInternships());
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});