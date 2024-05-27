import { useRef, useEffect, useState } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CityType, PointType} from '../../map-types/map-types';

const defaultCustomIcon = leaflet.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  
  const currentCustomIcon = leaflet.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  
  type MapProps = {
    city: CityType;
    points: PointType[];
    selectedPoint?: PointType;
    height: number;
  }
  
  function Map({city, points, selectedPoint, height}: MapProps) {
    const mapRef = useRef(null);
    const isRenderedRef = useRef(false);
    const [map, setMap] = useState<leaflet.Map | null>(null);
    useEffect(() => {
      if (mapRef.current !== null && !isRenderedRef.current) {
        const instance = leaflet.map(mapRef.current, {
          center: {
            lat: city.lat,
            lng: city.lng,
          },
          zoom: city.zoom,
        });
  
        leaflet
          .tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            },
          )
          .addTo(instance);
  
        setMap(instance);
        isRenderedRef.current = true;
      }
    }, [mapRef, city]);
    useEffect(() => {
      if (map) {
        map.eachLayer((layer) => {
          if (layer instanceof leaflet.Marker) {
            layer.remove();
          }
        });
        points.forEach((point) => {
          leaflet
            .marker({
              lat: point.lat,
              lng: point.lng,
            },
            {
              icon: (selectedPoint && point.title === selectedPoint.title)
                ? currentCustomIcon
                : defaultCustomIcon,
            })
            .addTo(map);
        });
      }
    }, [map, points, selectedPoint]);
    return (
      <div
        style={{height: `${height}px`}}
        ref={mapRef}
      >
      </div>
    );
  }
  
  export default Map;