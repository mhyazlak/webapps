function filterList(list, filters) {
  let newArray = list.filter((p) => {
    if (filters.typeFilters.length === 0) return p.id <= 913;
    else
      return p.id <= 913 && filters.typeFilters.includes(p.types[0].type.name);
  });
  return newArray;
}

//filter for Type

//filter for id

//filter for name

export default filterList;
