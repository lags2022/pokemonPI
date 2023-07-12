module.exports = async (types, Model) => {
  const newArray = [];
  for (const type of types) {
    const typeSearch = await Model.findOne({
      where: {
        name: type,
      },
    });
    if (typeSearch) newArray.push(typeSearch);
  }
  return newArray;
};
