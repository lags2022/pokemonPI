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
  else if (name.length > 20)
    errors.name = "name must be less than 20 characters";
  if (!image) errors.image = "Required image";
  if (!hp) errors.hp = "Required hp";
  if (!attack) errors.attack = "Required attack";
  if (!defense) errors.defense = "Required defense";
  if (!speed) errors.speed = "Required speed";
  if (!height) errors.height = "Required height";
  if (!weight) errors.weight = "Required weight";
  if (types.length < 2) errors.types = "Min 2 types";

  return errors;
};
