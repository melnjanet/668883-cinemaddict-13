export let nanoid = (t = 21) => {
  let e; let r;
  e = ``;
  r = crypto.getRandomValues(new Uint8Array(t));
  for (; t--;) {
    let n = 63 & r[t];
    // eslint-disable-next-line no-nested-ternary
    e += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? `_` : `-`;
  }
  return e;
};
