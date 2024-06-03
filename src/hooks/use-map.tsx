import { useState, useEffect, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/city';

function useMap(mapRef: React.MutableRefObject<HTMLElement | null>, city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const mapInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current && !mapInitialized.current) {
      const mapInstance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      const baseLayer = new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      });

      mapInstance.addLayer(baseLayer);
      setMap(mapInstance);
      mapInitialized.current = true;
    }

  }, [mapRef, city]);

  return map;
}

export default useMap;
