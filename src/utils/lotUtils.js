// Very naively split an address into street and locality/province pieces.
// Normally I would pull in something that could reliably separate these, but
// I don't want to spend time on it now.
export const splitAddress = (address) => {
  let [street, ...localityProvince] = address.split(",");
  localityProvince = localityProvince.join(", ");
  return [street, localityProvince];
};

// This _should_ be a straightforward converstion, but I'd be interested to hear
// if there were gotchas.
export const acresToSQFT = (acres) => {
  return acres * 43560;
};
