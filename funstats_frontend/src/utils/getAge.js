export function getAge(timestamp) {
  const now = Date.now();
  const secondsFromEpoch = Math.floor((now - timestamp * 1000) / 1000);

  let age = Math.floor(secondsFromEpoch / 31536000);
  return `${age} years old`;
}
