import {
  VariantColorsResolver,
  createTheme,
  defaultVariantColorsResolver,
} from "@mantine/core";

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  // Add new variants
  if (input.variant === "danger") {
    return {
      background: "var(--mantine-color-red-9)",
      hover: "var(--mantine-color-red-8)",
      color: "var(--mantine-color-white)",
      border: "none",
    };
  }

  return defaultResolvedColors;
};

// note: you don't need to do 'variantColorResolver: variantColorResolver'
// because it's a shorthand in typescript when the varible name is the same
export const theme = createTheme({
  fontFamily: "'DM Sans', sans-serif",
  primaryColor: "indigo",
  primaryShade: { light: 7, dark: 6 },
  variantColorResolver,
});
