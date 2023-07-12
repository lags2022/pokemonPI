const haveNumber = /\d/;
const hasLetters = /[a-zA-Z]/;

export const validations = ({
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types,
}) => {
  let errors = {};

  if (!name) errors.name = "Required";
  else if (haveNumber.test(name)) errors.name = "Name must not have numbers";
  else if (name.length < 3) errors.name = "Name more than 3 characters";
  else if (name.length > 20) errors.name = "Name less than 20 characters";

  if (!image) errors.image = "Required image";

  if (!hp) errors.hp = "Required hp";
  else if (hp < 1) errors.hp = "Minimum value 1";
  else if (hp > 200) errors.hp = "Maximun value 200";
  else if (hasLetters.test(hp)) errors.hp = "Hp contains letters";

  if (!attack) errors.attack = "Required attack";
  else if (attack < 5) errors.attack = "Minimum value 5";
  else if (attack > 255) errors.attack = "Maximun value 255";
  else if (hasLetters.test(attack)) errors.attack = "Attack contains letters";

  if (!defense) errors.defense = "Required defense";
  else if (defense < 5) errors.defense = "Minimum value 5";
  else if (defense > 255) errors.defense = "Maximun value 255";
  else if (hasLetters.test(defense))
    errors.defense = "Defense contains letters";

  if (!speed) errors.speed = "Required speed";
  else if (speed < 5) errors.speed = "Minimum value 5";
  else if (speed > 150) errors.speed = "Maximun value 150";
  else if (hasLetters.test(speed)) errors.speed = "Speed contains letters";

  // if (!height) errors.height = "Required height";
  if (height < 0.1) errors.height = "Minimum value 0.1";
  else if (height > 20) errors.height = "Maximun value 20";
  else if (hasLetters.test(height)) errors.height = "Height contains letters";

  // if (!weight) errors.weight = "Required weight";
  if (weight < 1) errors.weight = "Minimum value 1";
  else if (weight > 1000) errors.weight = "Maximun value 1000";
  else if (hasLetters.test(weight)) errors.weight = "Weight contains letters";

  if (types.length < 2) errors.types = "Min 2 types";
  else if (types.length > 6) errors.types = "Max 6 types";

  return errors;
};
