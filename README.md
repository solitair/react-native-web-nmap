# react-native-web-nmap
> React Native for Web implementation of react-native-nmap

## Getting started
`$ npm install react-native-web-nmap --save`

Alias the package in your webpack config:

```
resolve: {
    alias: {
        'react-native': 'react-native-web',
        ...
        'react-native-nmap': 'react-native-web-nmap',
    }
}
```

If you suffer from errors related to React version, please alias react and react-dom in webpack.config.js.

You need to have a Naver Cloud Client ID to use the map, you can get one [here](https://navermaps.github.io/maps.js.en/docs/tutorial-1-Getting-Client-ID.html).

Then, you should change the ncpClientId value in src/index.js:

## Usage

``` javascript
import NaverMapView from 'react-native-nmap';
```
See the original [documentation](https://github.com/QuadFlask/react-native-naver-map).

The supported components are:

* `NaverMapView`
* `NaverMapView.Marker`
* `MapView.Polyline`

`NaverMapView`:
- The officially supported props are:
    - `center`
- The officially supported events are:
    - `TBD`

`NaverMapView.Marker`:
- The officially supported props are:
    - `coordinate`
- The officially supported events are:
    - `onClick`


## Contributing
PRs are welcome!
