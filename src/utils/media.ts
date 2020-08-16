const sizes = {
  desktopS: '1920px',
  laptopL: '1366px',
  laptopS: '1280px',
  tablet: '1024px',
  phone: '600px',
};

export const media = {
  tablet: `(max-width: ${sizes.tablet})`,
  phone: `(max-width: ${sizes.phone})`,
  laptopS: `(max-width: ${sizes.laptopS})`,
  laptopL: `(max-width: ${sizes.laptopL})`,
  desktopS: `(max-width: ${sizes.desktopS})`,
};
