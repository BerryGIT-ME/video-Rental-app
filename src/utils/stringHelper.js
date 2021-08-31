export function sortString(x, y) {
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
}

export function sort(value, _movies, sortby) {
  let sorted;
  let sortMode;
  if (value === "title" || value === "genre") {
    if (value === "title") {
      sorted = _movies.sort((a, b) => {
        let x = a[value].toLowerCase();
        let y = b[value].toLowerCase();
        return sortString(x, y);
      });
    }
    if (value === "genre") {
      sorted = _movies.sort((a, b) => {
        let x = a[value].name.toLowerCase();
        let y = b[value].name.toLowerCase();
        return sortString(x, y);
      });
    }
  } else {
    sorted = _movies.sort((a, b) => a[value] - b[value]);
  }
  sortMode = "descending";
  if (sortby === "descending") {
    sorted = sorted.reverse();
    sortMode = "ascending";
  }
  return { movies: sorted, sortMode };
}
