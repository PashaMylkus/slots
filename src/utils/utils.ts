const getScreenWidth = (): number => {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};

const getScreenHeight = (): number => {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
};
export { getScreenWidth, getScreenHeight };
