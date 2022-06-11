export function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

export function eventOn(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

export function capitalizeFirstLetterSecondWord(string) {
  const secondWord =
    string.split('-')[1].charAt(0).toUpperCase() +
    string.split('-')[1].slice(1);
  return string.split('-')[0] + secondWord;
}
