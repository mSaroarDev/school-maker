export const useDeviceDetect = () => {
  const windowWidth = window.innerWidth;

  return {
    isMobile: windowWidth >= 320 && windowWidth <= 767,
    isTablet: windowWidth >= 768 && windowWidth <= 1023,
    isDesktop: windowWidth >= 1024 
  };
}