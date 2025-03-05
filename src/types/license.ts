export interface PackageInfo {
  name: string;
  version: string;
  isDev: boolean;
}

export interface LicenseInfo {
  name: string;
  version: string;
  license: string;
  licenseUrl?: string;
  repository?: string;
  homepage?: string;
  isDev: boolean;
}

export interface PackageJsonData {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface LicenseDocumentData {
  packages: LicenseInfo[];
  generatedAt: string;
}
