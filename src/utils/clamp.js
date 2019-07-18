export const clamp = (position) => {
  if (position > 500) {
    return 500;
  }
  if (position < 0) {
    return 0;
  }
  return position;
}