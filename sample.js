/* 
    The following code illustrates the use of the Bing Distance Matrix package
    for calculating a distance matrix with one or more origins and one or more 
    destinations. The 'getDistanceMatrix' method fetches the distance and 
    travel time for every origin-destination combination possible for the 
    chosen mode of travel.
*/

const BingDistanceMatrix = require('bing-distance-matrix');

/* 
    Initialise with a valid Bing Maps API Key
    Follow instruction on this link to obtain API key: 
    https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key
*/
const bdm = new BingDistanceMatrix(process.env.BING_MAPS_API_KEY);
const options = {
    // Required <Array<Object<{ latitude: number, longitude: number }>>>.
    // Specify one or more origins for the distance matrix
    origins: [{
        latitude: 47.6044,
        longitude: -122.3345
    },
    {
        latitude: 47.6731,
        longitude: -122.1185
    }],
    
    // Required <Array<Object<{ latitude: number, longitude: number }>>>.
    // Specify one or more destinations for the distance matrix
    destinations: [{
        latitude: 47.6149,
        longitude: -122.1936
    },
    {
        latitude: 45.5347,
        longitude: -122.6231
    }, 
    {
        latitude: 47.4747,
        longitude: -122.2057
    }],

    // Required.
    // Specifies the mode of transportation to use when calculating the distance matrix
    // Can be one of the following values: 'driving', 'walking', 'transit'
    travelMode: 'driving',
    
    // Optional <string>.
    // The units to use for time durations in the response.
    // One of the following values: 'minute'[default], 'second'
    timeUnit: 'second',
    
    // Optional <string>.
    // The units to use for distances in the response.
    // One of the following values: 'mile' or 'mi, 'kilometer' or 'km'[default]
    distanceUnit: 'km'
};

// This method accepts the options object we created above as required parameter, and resturns a promise
bdm.getDistanceMatrix(options)
.then(data => {
    console.log(data)
    /*  Response will ook like this:
        {
            distances: [
                { originIndex: 0, destinationIndex: 0, distance: 15.879, unit: 'km' },
                { originIndex: 0, destinationIndex: 1, distance: 274.66, unit: 'km' },
                { originIndex: 0, destinationIndex: 2, distance: 19.391, unit: 'km' },
                { originIndex: 1, destinationIndex: 0, distance: 10.599, unit: 'km' },
                { originIndex: 1, destinationIndex: 1, distance: 290.339, unit: 'km' },
                { originIndex: 1, destinationIndex: 2, distance: 25.729, unit: 'km' }
            ],
            durations: [
                { originIndex: 0, destinationIndex: 0, duration: 11423.4, unit: 'second' },
                { originIndex: 0, destinationIndex: 1, duration: 197692.1, unit: 'second' },
                { originIndex: 0, destinationIndex: 2, duration: 13948.3, unit: 'second' },
                { originIndex: 1, destinationIndex: 0, duration: 7625.1, unit: 'second' },
                { originIndex: 1, destinationIndex: 1, duration: 208971.7, unit: 'second' },
                { originIndex: 1, destinationIndex: 2, duration: 18511.6, unit: 'second' }
            ]
        }
    */
})
.catch(error => {
    console.log(error)
});
