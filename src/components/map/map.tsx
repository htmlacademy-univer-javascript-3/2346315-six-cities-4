import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, MapClasses } from '../constants/constants';

import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Offer[];
  activeOfferId: number;
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


function Map(props: MapProps): JSX.Element {
  const {city, points, activeOfferId, isMainPage} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);


  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer.options.pane === 'markerPane') {
          map.removeLayer(layer);
        }
      });

      points.forEach((point: Offer) => {
        const marker = new Marker({
          lat: point.city.location.latitude,
          lng: point.city.location.longitude,
        });

        marker.setIcon(
          activeOfferId !== undefined && point.id === activeOfferId ? currentIcon : defaultIcon
        )
          .addTo(map);
      });
    }
  }, [map, points, activeOfferId]);

  useEffect(() => {
    if (map) {
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  return (
    <section className={isMainPage ? MapClasses.SectionPropertyMapClass : MapClasses.SectionMainMapClass} ref={mapRef} key={city.name}>
    </section>
  );
}

export default Map;
