const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmFtYW51amEiLCJhIjoiY2szNml4NjRjMDI2ejNrbzF6cmt1b25udSJ9.IR616d80MdtRxhUv7_YpwA&limit=1`

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find the location. Try another search...', undefined);
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                name: response.body.features[0].place_name
            });
        }
    })
};

module.exports = geoCode;