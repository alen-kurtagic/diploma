function capitalizeFirstLetter(str: string): string {
  if (!str) return "/";
  const lowercase: string = str.toLowerCase();
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
}

function replaceLastCommaWithAnd(inputString: string): string {
  const lastCommaIndex = inputString.lastIndexOf(",");

  if (lastCommaIndex !== -1) {
    const beforeLastComma = inputString.substring(0, lastCommaIndex);
    const afterLastComma = inputString.substring(lastCommaIndex + 1);
    return `${beforeLastComma} in ${afterLastComma}`;
  }

  return inputString;
}

export { capitalizeFirstLetter, replaceLastCommaWithAnd };
