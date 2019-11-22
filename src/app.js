const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weatherInfo = require('./utils/weatherinfo')
const geoCode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express();
const port = process.env.PORT || 3003

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ramanuja Sreenidhi'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ramanuja Sreenidhi'
    })
});

// app.get('', (req, res) => {

//     res.send('<h1>Weather</h1>');
//     handler();
// });

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a helpful text',
        title: 'Help',
        name: 'Ramanuja Sreenidhi'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter the address to search'
        })
    }
    geoCode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error
            })
        }else{
            weatherInfo(data.latitude, data.longitude, (error, data) => {
                if(error){
                   return res.send({
                       error
                   })
                }else{
                    return res.send({
                        address: req.query.address,
                        summary: data.summary,
                        temperature: data.currentTemp,
                        precipProbability: data.precipProbability
                    })
                }
            });
        }
    })
    
})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorpage', {
        error: 'Help article not found'
    })
    
})

app.get('*', (req, res) => {
    res.render('errorpage', {
        error: "Oops! Page not found"
    })
   
})


app.listen(port, () => {
    console.log('Server is up on port ' + port);
    
});

var handler = function () {
    server.close();
}