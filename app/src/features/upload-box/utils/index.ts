type Device = 'phone' | 'tablet' | 'desktop';

const getDevice = (): Device => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 640) {
    return 'phone';
  }

  if (screenWidth <= 768) {
    return 'tablet';
  }

  return 'desktop';
};

const deviceMaxTextLengthMap: Record<Device, number> = {
  phone: 10,
  tablet: 30,
  desktop: 30,
};

export const createAdjustedDeviceTitle = (title: string) => {
  const device = getDevice();
  const maxLength = deviceMaxTextLengthMap[device];

  if (title.length <= maxLength) return title;

  return title.substring(0, maxLength) + '...';
};
