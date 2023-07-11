export const order = (a, b, value) => {
  if (value === "AZ") {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  } else if (value === "ZA") {
    if (a.name > b.name) {
      return -1;
    }
    if (a.name < b.name) {
      return +1;
    }
    return 0;
  } else if (value === "AscAttack") {
    return a.attack - b.attack;
  } else {
    return b.attack - a.attack;
  }
};
