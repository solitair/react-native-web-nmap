import React, { useEffect, useRef, useState, useContext, createContext } from 'react';

const MapContext = createContext();
const ncpClientId = 'lh33q9226g'; // for localhost

function NaverMapView(props) {
  const [naverMap, setNaverMap] = useState(null);
  const mapRef = useRef(null);
  const { center, style } = props;
  //console.log('[MapView of React]', center);

  const myStyle = style ? style : { width: '100%', height: '100%' };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' + ncpClientId;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      //console.log('***', window);
      const { naver } = window;
      if (!mapRef.current || !naver) {
        console.log('Warning: div element for map or naver object is not valid.');
        return;
      }

      // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
      const location = new window.naver.maps.LatLng(center.latitude, center.longitude);
      const mapOptions = {
        center: location,
        zoom: center.zoom,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      setNaverMap(map);
    };
  }, []);

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
    const eventListener = naver.maps.Event.addListener(currentMarker, 'click', function() {
      onClick();
    });

    return () => {
      naver.maps.Event.removeListener(eventListener);
    };
  }, [naverMap]);

  return <div />;
}

export default NaverMapView;
