export const filterById = id =>
  data => (id && data && data.filter(item => item.id === id)) || data;

export const filterFirst = (first = 100) =>
  data => (data && data.slice(0, first)) || data;

export const wrapWithProperty = (name = 'node') =>
  data => data && data.map(items => ({ [name]: items }));
