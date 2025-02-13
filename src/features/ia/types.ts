export type NavigationType = "sidebar" | "topbar" | "sidebar, topbar" | "none";
export type AuthType = "required" | "optional" | "none";

export interface IAFormData {
  navigationType: NavigationType;
  authType: AuthType;
}
