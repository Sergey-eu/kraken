export const useCssVariables = (names: string[]) => {
  const cssVariables: { [key: string]: string } = {};
  const cssVarValues: string[] = [];

  names.forEach((name) => {
    const varValue = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .replace(/\s/g, '');

    cssVariables[name] = varValue;

    cssVarValues.push(varValue);
  });

  return { cssVariables, cssVarValues };
};
