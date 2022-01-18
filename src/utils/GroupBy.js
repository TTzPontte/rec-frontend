export const groupBy = (array, key) => {
  return array.reduce((a, c) => {
    const t = a[c[key]] || [];
    t.push(c);
    a[c[key]] = t;
    return a;
  }, {});
};
