const request = require('request');

// 

// request({url: url, json: true}, (error, response) => {
//     //console.log(response.body.currently);
//     if(error){
//         console.log(``);
//     }else if(response.body.error){
//         console.log(``);
//     }
//     else{
//         console.log(`It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain`);
//     }
   
// });

const weatherInfo = (latitude, longitude, callBack) => {

    const url = "https://api.darksky.net/forecast/3c4020fc4cc6e30539ec15b06336e645/" + latitude + 
                ","+ longitude + "?units=si";
    
    request({url: url, json: true}, (error, response) => {
        if(error){
            callBack('Unable to connect to weather service', undefined);
        }else if(response.body.error){
            callBack('Unable to find the location', undefined);
        }else{
            callBack(undefined, {
                currentTemp: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability,
                summary: response.body.daily.data[0].summary
            });
        }
    });
};

module.exports = weatherInfo;