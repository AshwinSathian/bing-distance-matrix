# Bing Distance Matrix
This NodeJS package allows you to interface with the Microsoft's official Bing Maps' Distance Matrix API. 

## Installation

```shell
$ npm i -S bing-distance-matrix
```

## Usage

To use this apckage and teh underlying API, you need to first obrain an API Key for Bing Maps. Follow instruction on [this link](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key) to obtain the API key.

After obtaining the key, initialie the package as follows, assuming that teh Api key is stored as an environment variable:

```js
const BingDistanceMatrix = require('bing-distance-matrix');
const bdm = new BingDistanceMatrix(process.env.BING_MAPS_API_KEY);
```

### Methods

#### `getDistanceMatrix`
This method resturns a promise that resoves to give the Distance Matrix results

```js
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
    }]
};

bdm.getDistanceMatrix(options)
.then(data => {
    console.log(data)
})
.catch(error => {
    console.log(error)
});

```

Check out the sample code or [official docs](https://docs.microsoft.com/en-us/bingmaps/rest-services/routes/calculate-a-distance-matrix) for more cutomization options.

## Contribution and Bugs
Contact the author for info.

## Author
Ashwin Sathian. Drop me a line in my [mail](ashwinsathyan19@gmail.com).

## License
This project is licensed under the ISC License