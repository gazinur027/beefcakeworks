// Transliterates Cyrillic characters to Latin so that any Russian input
// (e.g. from a Russian-language keyboard) is converted to English letters
// automatically as the user types.
const CYRILLIC_MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
  я: "ya", і: "i", ї: "yi", є: "e", ґ: "g",
};

export function transliterateToLatin(input: string): string {
  return input
    .split("")
    .map((char) => {
      const lower = char.toLowerCase();
      const mapped = CYRILLIC_MAP[lower];
      if (mapped === undefined) return char;
      // Preserve capitalization of the original character
      if (char === lower) return mapped;
      return mapped.charAt(0).toUpperCase() + mapped.slice(1);
    })
    .join("");
}

// Formats raw input as a US-style MM/DD/YYYY mask.
// Used instead of <input type="date"> because the native date placeholder
// ("дд.мм.гггг") is rendered by the browser in the OS language and cannot
// be overridden. A masked text field looks identical on every device.
//
// The month is parsed smartly so people can type "9/15/2026" as 9152026:
// a leading 0, or 1 followed by 0-2, means a two-digit month (01-12);
// otherwise the first digit is the whole month (2-9).
export function formatDateMask(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length === 0) return "";
  if (digits.length === 1) return digits;

  const first = Number(digits[0]);
  const second = Number(digits[1]);
  const isTwoDigitMonth = first === 0 || (first === 1 && second <= 2);

  const month = isTwoDigitMonth ? digits.slice(0, 2) : digits.slice(0, 1);
  const rest = digits.slice(month.length);
  const day = rest.slice(0, 2);
  const year = rest.slice(2, 6);

  let out = month;
  if (rest.length > 0) out += "/" + day;
  if (rest.length > 2) out += "/" + year;
  return out;
}

// Validates a MM/DD/YYYY string as a real calendar date
export function isValidUSDate(value: string): boolean {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
  const [month, day, year] = value.split("/").map(Number);
  if (month < 1 || month > 12 || year < 2000) return false;
  const date = new Date(year, month - 1, day);
  return date.getMonth() === month - 1 && date.getDate() === day;
}