import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { City } from '../../types/city';
import { Points } from '../../types/points';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../constants/constants.ts';
import { MapClasses } from '../../constants/constants.ts';
import { useAppSelector } from '../../hooks';
import { getCurrentMarker } from '../../store/offers-slice/offers-slice-selectors.ts';

import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Points[];
  isMainPage: boolean;
  specialCaseId?: string;
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


function Map({city, points, isMainPage, specialCaseId}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const selectedMarker = useAppSelector(getCurrentMarker);

  useEffect(() => {
    if (map) {
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markers = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker([point.location.latitude, point.location.longitude]);
        const isSelected = specialCaseId
          ? point.id === specialCaseId
          : selectedMarker !== null && point.id === selectedMarker.id;

        marker.setIcon(isSelected ? currentIcon : defaultIcon).addTo(markers);
      });

      return () => {
        map.removeLayer(markers);
      };
    }
  }, [map, points, selectedMarker, specialCaseId]);


  const mapClassName = isMainPage ? MapClasses.SectionPropertyMapClass : MapClasses.SectionMainMapClass;


  return <div className={mapClassName} style={{ height: '100%' }} ref={mapRef}></div>;
}

export default Map;
