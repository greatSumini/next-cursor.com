export type DesignStyle =
  | "minimal"
  | "modern"
  | "classic"
  | "playful"
  | "luxury"
  | "tech";

export type ColorScheme =
  | "monochrome"
  | "analogous"
  | "complementary"
  | "triadic"
  | "custom";

export interface DesignFormData {
  designStyle: DesignStyle;
  colorScheme: ColorScheme;
  primaryColor: string;
  moodKeywords: string;
  references: string;
  themeDetailType: "auto" | "manual";
}
