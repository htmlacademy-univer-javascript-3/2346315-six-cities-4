import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../constants/constants';
import { MapClasses } from '../constants/constants';
import { useAppSelector } from '../../hooks';

import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Offer[];
  isMainPage: boolean;
};

const defaultIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


function Map({city, points, isMainPage}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const selectedMarker = useAppSelector((state) => state.selectedMarker);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markers = layerGroup().addTo(map);
      points.forEach((point) => {
        new Marker({
          lat: point.city.location.latitude,
          lng: point.city.location.longitude
        }).setIcon(selectedMarker !== null && point.id === selectedMarker.id ? currentIcon : defaultIcon)
          .addTo(markers);

      });

      return () => {
        map.removeLayer(markers);
      };
    }
  }, [map, points, selectedMarker]);


  const mapClassName = isMainPage ? MapClasses.SectionPropertyMapClass : MapClasses.SectionMainMapClass;


  return <div className={mapClassName} style={{ height: '100%' }} ref={mapRef}></div>;
}

export default Map;