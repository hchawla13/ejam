const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch')
const axios = require('axios')
var Request = require("request")


const app = express();
const port = process.env.PORT || 5000;
const cityName = 'dallas';

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather'
const APPID = '552e3217e21af17ca9062f1016cd3d85'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express world ' });
});

app.get('/weatherData', (req, res) => {
    const fullUrl = `${baseUrl}?q=${req.query.city}&appid=${APPID}`;
    Request.get(fullUrl, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        res.send({ data: JSON.parse(body) });
    });


});

app.post('/api/world', (req, res) => {
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));