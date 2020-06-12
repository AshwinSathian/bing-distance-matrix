
'use strict'

const https = require('https');

class BingDistanceMatrix {
    
    BING_MAPS_API_KEY;
    
    bingMapsRequestOptions;
    bingMapQueryOpts;
    
    distanceResults;
    durationResults;
    
    constructor(apiKey) {
        this.BING_MAPS_API_KEY = apiKey;
        
        this.bingMapsRequestOptions = {
            hostname: 'dev.virtualearth.net',
            port: 443,
            path: '/REST/v1/Routes/DistanceMatrix?key=' + apiKey,
            method: 'POST'
        };
        
        this.bingMapQueryOpts = {
            origins: [],
            destinations: [],
            travelMode: 'driving',
            timeUnit: 'second',
            distanceUnit: 'km'
        }
    
        this.distanceResults = [];
        this.durationResults = [];
    }

    getDistanceMatrix = (options) => {
        return new Promise((resolve, reject) => {
            if (!options) {
                console.error('Please pass valid parameters');
                reject('ERROR: No parameters set');
                return;
            }

            this.bingMapQueryOpts.origins = options.origins;
            this.bingMapQueryOpts.destinations = options.destinations;
            if (options.travelMode) {
                this.bingMapQueryOpts.travelMode = options.travelMode;
            }
            if (options.timeUnit) {
                this.bingMapQueryOpts.timeUnit = options.timeUnit;
            }
            if (options.distanceUnit) {
                this.bingMapQueryOpts.distanceUnit = options.distanceUnit;
            }
            
            if (this.bingMapQueryOpts.origins.length <= 0) {
                console.error('Please enter atleast one origin point.');
                reject('ERROR: No Origins specified');
                return;
            }
            if (this.bingMapQueryOpts.destinations.length <= 0) {
                console.error('Please enter atleast one destination point.');
                reject('ERROR: No Destinations specified');
                return;
            }
        
            if (!this.BING_MAPS_API_KEY) {
                console.error('Please ensure that a valid Bing Maps API key is passed.');
                reject('ERROR: No API Key specified');
                return;
            }
            
            const bingMapReq = https
            .request(this.bingMapsRequestOptions, (res, err) => {
                if (err) {
                    console.log('An unexpected err occured');
                    reject('ERROR: ', err);
                }
        
                res.on('data', (d) => {
                    console.log(this.bingMapsRequestOptions)
                    console.log(JSON.parse(d))
                    if (
                        JSON.parse(d).resourceSets && 
                        JSON.parse(d).resourceSets[0].resources
                    ) {
                        JSON.parse(d).resourceSets[0].resources[0].results.forEach(result => {
                            this.distanceResults.push({
                                originIndex: result.originIndex,
                                destinationIndex: result.destinationIndex,
                                distance: result.travelDistance,
                                unit: this.bingMapQueryOpts.distanceUnit
                            });
                            this.durationResults.push({
                                originIndex: result.originIndex,
                                destinationIndex: result.destinationIndex,
                                duration: result.travelDuration,
                                unit: this.bingMapQueryOpts.timeUnit
                            });
                        });
                        resolve({
                            distances: this.distanceResults, 
                            durations: this.durationResults
                        })
                    }
                });
            });
            
            bingMapReq.write(JSON.stringify(this.bingMapQueryOpts))
            
            bingMapReq.on('error', (e) => {
                console.log('An unexpected error occured');
                reject('ERROR: ', e);
            });
            
            bingMapReq.end();     
        });
    };
}

module.exports = BingDistanceMatrix;
