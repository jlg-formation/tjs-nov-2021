export function getLang() {
  if (navigator.languages !== undefined) return navigator.languages[0];
  return navigator.language;
}

export const defaultLocale = getLang();
export const locale = "fr-FR";
console.log("locale: ", locale);
