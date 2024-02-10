export const isStrongPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export function getBodyTypeString(bodyType: number) {
  switch (bodyType) {
    case 1:
      return 'Male';
    case 2:
      return 'Female';
    case 3:
      return "Don't Specify";
    default:
      return 'Unknown';
  }
}

export function getWeight(goalNumber: number) {
  switch (goalNumber) {
    case 0:
      return {
        loseWeight: true,
        maintainWeight: false,
        gainWeight: false,
      };
    case 1:
      return {
        loseWeight: false,
        maintainWeight: true,
        gainWeight: false,
      };
    case 2:
      return {
        loseWeight: false,
        maintainWeight: false,
        gainWeight: true,
      };
    default:
      return {};
  }
}

export function getPower(goalArray: number[]) {
  const physiqueGoal = {
    toneUp: false,
    bulkUp: false,
    getStrong: false,
  };

  if (goalArray.includes(0)) {
    physiqueGoal.toneUp = true;
  }

  if (goalArray.includes(1)) {
    physiqueGoal.bulkUp = true;
  }

  if (goalArray.includes(2)) {
    physiqueGoal.getStrong = true;
  }

  return physiqueGoal;
}

export function getWatchName(bodyType: number) {
  switch (bodyType) {
    case 0:
      return 'Apple Watch';
    case 1:
      return 'Fitbit';
    case 2:
      return 'Google fit';
    case 3:
      return 'Oura';
    case 4:
      return 'Whoop';
    default:
      return '';
  }
}
