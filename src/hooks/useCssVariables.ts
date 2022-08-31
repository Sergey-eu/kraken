export const useCssVariables = (names: Array<string>) => {
  const cssVariables: { [key: string]: string } = {};
  const cssVarValues: Array<string> = [];

  names.forEach((name) => {
    const varValue = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .replace(/\s/g, "");

    cssVariables[name] = varValue;

    cssVarValues.push(varValue);
  });

  return { cssVariables, cssVarValues };
};
