import { Icon } from 'leaflet';
import { IconType } from './map.const';

export function createIcon(config: IconType) {
  return new Icon({
    iconUrl: config.url,
    iconAnchor: [config.anchorX, config.anchorY],
    iconSize: [config.width, config.heigth],
  });
}
