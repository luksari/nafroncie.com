export const sizes = {
  desktopS: 1920,
  laptopL: 1366,
  laptopS: 1280,
  tablet: 1024,
  phone: 600,
};

export const media = {
  tablet: `(max-width: ${sizes.tablet}px)`,
  phone: `(max-width: ${sizes.phone}px)`,
  laptopS: `(max-width: ${sizes.laptopS}px)`,
  laptopL: `(max-width: ${sizes.laptopL}px)`,
  desktopS: `(max-width: ${sizes.desktopS})`,
};
