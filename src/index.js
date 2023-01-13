import React, { useEffect, useRef, useState, useContext, createContext } from 'react';

const MapContext = createContext();
const ncpClientId = 'lh33q9226g'; // for localhost

function NaverMapView(props) {
  const [naverMap, setNaverMap] = useState(null);
  const [centerOfMap, setCenterOfMap] = useState({});
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const mapRef = useRef(null);
  const { center, style, onCameraChange } = props;
  //console.log('[MapView of React]', center);

  const myStyle = style ? style : { width: '100%', height: '100%' };
  var dragendEventListener = null;
  var zoomEventListener = null;

  useEffect(() => {
    if (scriptLoaded === false) {
      // this is the first time to do useEffect.
      //console.log('[react-native-naver-nmap] useEffect-0', center);

      const script = document.createElement('script');
      script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' + ncpClientId;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        //console.log('***', window);
        setScriptLoaded(true);
      };
    } else {
      //console.log('[react-native-naver-nmap] useEffect-0: after loading script.', center);
      const { naver } = window;
      if (!mapRef.current || !naver) {
        console.log('Warning: div element for map or naver object is not valid.');
        return;
      }

      // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
      const location = new naver.maps.LatLng(centerOfMap.latitude, centerOfMap.longitude);
      const mapOptions = {
        center: location,
        zoom: centerOfMap.zoom,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };
      const map = new naver.maps.Map(mapRef.current, mapOptions);

      setNaverMap(map);

      dragendEventListener = naver.maps.Event.addListener(map, 'dragend', function() {
        const mapCenter = map.getCenter();
        //console.log('...dragend: newcenter...', mapCenter);
        onCameraChange({ latitude: mapCenter._lat, longitude: mapCenter._lng, zoom: center.zoom });
      });

      zoomEventListener = naver.maps.Event.addListener(map, 'zoom_changed', function(zoom) {
        const mapCenter = map.getCenter();
        //console.log('...zoom_changed: newcenter...', mapCenter, zoom);
        onCameraChange({ latitude: mapCenter._lat, longitude: mapCenter._lng, zoom: zoom });
      });
    }

    return () => {
      // Notice! This would be called when NaverMapView is re-rendered due to dependency.
      //console.log('~~~~ return');
      if (dragendEventListener) window.naver.maps.Event.removeListener(dragendEventListener);
      if (zoomEventListener) window.naver.maps.Event.removeListener(zoomEventListener);
    };
  }, [scriptLoaded]);

  useEffect(() => {
    //console.log('[react-native-naver-nmap] useEffect-1', center);

    setCenterOfMap(center);
    if (naverMap) {
      //console.log('.....naverMap setCenter');
      const location = new window.naver.maps.LatLng(center.latitude, center.longitude);
      naverMap.setCenter(location);
      naverMap.setZoom(center.zoom);
    }
  }, [center]);

  return (
    <MapContext.Provider value={naverMap}>
      <div ref={mapRef} style={myStyle}>
        Map area
      </div>
      {props.children}
    </MapContext.Provider>
  );
}

export function Marker(props) {
  const naverMap = useContext(MapContext);

  // eslint-disable-next-line no-unused-vars
  const { coordinate, onClick, image, width, height, ...rest } = props;

  useEffect(() => {
    //console.log('---', image);
    const { naver } = window;
    if (!naverMap || !naver) {
      console.log('Warning: map object or naver object is no valid.');
      return;
    }
    const markerOptions = {
      position: new naver.maps.LatLng(coordinate.latitude, coordinate.longitude),
      map: naverMap,
    };
    if (image) {
      markerOptions['icon'] = {
        url: image.uri,
      };
    }
    const currentMarker = new naver.maps.Marker(markerOptions);
    const clickEventListener = naver.maps.Event.addListener(currentMarker, 'click', function() {
      onClick();
    });

    return () => {
      naver.maps.Event.removeListener(clickEventListener);
    };
  }, [naverMap]);

  return <div />;
}

export default NaverMapView;
