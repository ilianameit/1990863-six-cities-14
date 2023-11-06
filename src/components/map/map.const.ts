export type IconType = {
  url: string;
  width: number;
  height: number;
  anchorX: number;
  anchorY: number;
};

export const defaultIconConfig: IconType = {
  url: '/img/pin.svg',
  width: 28,
  height: 40,
  anchorX: 14,
  anchorY: 40,
};

export const currentIconConfig: IconType = {
  url: '/img/pin-active.svg',
  width: 28,
  height: 40,
  anchorX: 14,
  anchorY: 40,
};
