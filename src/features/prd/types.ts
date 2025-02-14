export type Platform = "web" | "android" | "ios" | "desktop" | "other";
export type StorageType = "local(no-database)" | "database";

export interface PRDFormData {
  overview: string;
  reference: string;
  features: string[];
  targetUsers: string;
  platforms: Platform[];
  storageType: StorageType;
  techStack: string;
  suggestFeatures: boolean;
}
