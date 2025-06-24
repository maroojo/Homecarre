export const cleanFormUndefined = (form) => {
  return Object.entries(form).reduce((acc, [key, value]) => {
    if (value !== undefined) acc[key] = value;
    return acc;
  }, {});
}
