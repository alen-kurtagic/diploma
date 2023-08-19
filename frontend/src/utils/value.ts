function calculateCombinedValue(
  valueString: string | null
): number | undefined {
  if (!valueString) return undefined;

  let combinedValue = 0;

  console.log(valueString);
  // Splitting the values
  const values = valueString.toString().split(";");

  values.forEach((value) => {
    // Extract the EUR value
    const eurValue = value.split("-")[2]?.trim();
    // Check if it exists and is not an empty string
    if (eurValue) {
      // Remove the ' EUR' and parse the string to a number
      combinedValue += parseFloat(eurValue.replace(" EUR", ""));
    }
  });

  return combinedValue;
}

const prettifyValue = (value: number | undefined) => {
  if (!value) return undefined;
  return value.toLocaleString("en-US").replace(/,/g, " ") + " €";
};

export { calculateCombinedValue, prettifyValue };
