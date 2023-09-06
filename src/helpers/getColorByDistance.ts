import { COLORS } from '../constants';

export const getColorByDistance = (distance: number): string => {
  if (distance < 600) {
    return COLORS.green;
  } else if (distance >= 600 && distance <= 1500) {
    return COLORS.orange;
  } else {
    return COLORS.red;
  }
};
