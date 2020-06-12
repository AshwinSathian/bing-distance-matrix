const https = require('https');

const bingMapsHost = 'dev.virtualearth.net';
const bingMapsPath = '/REST/v1/Routes/DistanceMatrix?key=' + process.env.BING_MAPS_API_KEY;
const bingMapsRequestOptions = {
    hostname: bingMapsHost,
    port: 443,
    path: bingMapsPath,
    method: 'POST'
};
const bingMapQueryOpts = {
    origins: [],
    destinations: [],
    travelMode: 'walking',
    timeUnit: 'second',
    distanceUnit: 'km'
}

const distanceResults = [];
const durationResults = [];

const getDistanceMatrix = (options) => {
    return bingPromise = new Promise((resolve, reject) => {
        bingMapQueryOpts.origins = options.origins;
        bingMapQueryOpts.destinations = options.destinations;
        if (options.travelMode) {
            bingMapQueryOpts.travelMode = options.travelMode;
        }
        if (options.timeUnit) {
            bingMapQueryOpts.timeUnit = options.timeUnit;
        }
        if (options.distanceUnit) {
            bingMapQueryOpts.distanceUnit = options.distanceUnit;
        }
        
        if (bingMapQueryOpts.origins.length <= 0) {
            console.error('Please enter atleast one origin point.');
            reject('ERROR: No Origins specified');
            return;
        }
        if (bingMapQueryOpts.destinations.length <= 0) {
            console.error('Please enter atleast one destination point.');
            reject('ERROR: No Destinations specified');
            return;
        }
    
        const bingMapReq = https
        .request(bingMapsRequestOptions, (res, err) => {
            if (err) {
                console.log('An unexpected error occured');
                reject('ERROR: ', err);
            }
    
            res.on('data', (d) => {
                if (
                    JSON.parse(d).resourceSets && 
                    JSON.parse(d).resourceSets[0].resources
                ) {
                    JSON.parse(d).resourceSets[0].resources[0].results.forEach(result => {
                        distanceResults.push({
                            originIndex: result.originIndex,
                            destinationIndex: result.destinationIndex,
                            distance: result.travelDistance,
                            unit: bingMapQueryOpts.distanceUnit
                        });
                        durationResults.push({
                            originIndex: result.originIndex,
                            destinationIndex: result.destinationIndex,
                            distance: result.travelDuration,
                            unit: bingMapQueryOpts.timeUnit
                        });
                    });
                    resolve({
                        distances: distanceResults, 
                        durations: durationResults
                    })
                }
            });
        });
        
        bingMapReq.write(JSON.stringify(bingMapQueryOpts))
        
        bingMapReq.on('error', (e) => {
            console.log('An unexpected error occured');
            reject('ERROR: ', e);
        });
        
        bingMapReq.end();     
    });
};

module.exports = getDistanceMatrix;
