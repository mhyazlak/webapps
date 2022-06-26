function filterList(list, filters) {
  let filteredList = [...list];

  //name

  if (filters.nameFilter !== "")
    filteredList = filteredList.filter((pokemon) => {
      return pokemon.name.includes(filters.nameFilter);
    });

  //id
  if (filters.indexFilter !== 0)
    filteredList = filteredList.filter((pokemon) => {
      if (("" + pokemon.id).length === 1) {
        return ("00" + pokemon.id).includes("" + filters.indexFilter);
      }
      if (("" + pokemon.id).length === 2) {
        return ("0" + pokemon.id).includes("" + filters.indexFilter);
      }
      if (("" + pokemon.id).length === 3) {
        return ("" + pokemon.id).includes("" + filters.indexFilter);
      }
      return false;
    });

  //type
  if (filters.typeFilters.length !== 0) {
    if (filters.typeFilters.length === 1) {
      filteredList = filteredList.filter((p) => {
        if (p.types.length === 1)
          return filters.typeFilters.includes(p.types[0].type.name);
        if (p.types.length === 2)
          return (
            filters.typeFilters.includes(p.types[0].type.name) ||
            filters.typeFilters.includes(p.types[1].type.name)
          );
      });
    }
    if (filters.typeFilters.length === 2) {
      filteredList = filteredList.filter((p) => {
        if (p.types.length === 2)
          return (
            filters.typeFilters.includes(p.types[0].type.name) &&
            filters.typeFilters.includes(p.types[1].type.name)
          );
      });
    }
  }

  if (filters.alphabeticalToggle) {
    filteredList.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filteredList;
}

export default filterList;
