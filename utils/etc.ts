export function sortArray(arr: [], prop: string, sort = "asc") {
  if (sort === "asc")
    arr.sort((a, b) => (a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0));
  if (sort === "des")
    arr.sort((a, b) => (a[prop] < b[prop] ? 1 : b[prop] < a[prop] ? -1 : 0));
}

export function capFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function trimString(str: string, length = 32) {
  const trimmed = str.substring(0, length);
  const dots = str.length < length ? "" : "...";
  return trimmed + dots;
}
