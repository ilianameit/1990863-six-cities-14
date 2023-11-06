import { Icon } from 'leaflet';
import { IconType } from './map.const';

export function createIcon(config: IconType) {
  return new Icon({
    iconUrl: config.url,
    iconSize: [config.width, config.height],
    iconAnchor: [config.anchorX, config.anchorY],
  });
}
