import { Marker, layerGroup } from 'leaflet';
import { useEffect, useRef } from 'react';
import { City } from '../../types/city';
import { useMap } from '../../hooks/use-map/use-map';
import { createIcon } from './map.create-icon';
import { currentIconConfig, defaultIconConfig } from './map.const';
import { OfferPreview } from '../../types/offer-preview';
import './map.style.css';

type MapProps = {
  block: string;
  city: City;
  offers: OfferPreview[];
  selectedOffer: OfferPreview | null;
};

export function Map({block, city, offers, selectedOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if(map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer && offer.id === selectedOffer.id
              ? createIcon(currentIconConfig)
              : createIcon(defaultIconConfig)
          )
          .addTo(markerLayer);

      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return (
    <section
      ref={mapRef}
      className={`${block}__map map`}
    />
  );
}
