export function getPartString(string, separator, left) {
  const separatorIndex = string.indexOf(separator);
  if (separatorIndex === -1) {
    return string;
  }
  return string.slice(separatorIndex + 1);
}

export const breakLongWord = (word = '') => {
  const maxLength = 10; // Максимальная длина части слова
  return word.match(new RegExp(`.{1,${maxLength}}`, 'g')).join('\n');
};
