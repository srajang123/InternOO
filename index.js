const express = require('express');

//Imports above this

const app = express();
const PORT = 5000 || process.env.PORT;

app.get('/',(req, res) => {
    res.send("Hello");
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});