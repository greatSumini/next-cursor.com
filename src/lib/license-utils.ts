import { PackageInfo, LicenseInfo, PackageJsonData } from "@/types/license";

/**
 * package.json 문자열을 파싱하여 의존성 패키지 정보를 추출합니다.
 */
export function parsePackageJson(packageJsonString: string): PackageInfo[] {
  try {
    const packageJson: PackageJsonData = JSON.parse(packageJsonString);
    const packages: PackageInfo[] = [];

    // dependencies 추출
    if (packageJson.dependencies) {
      Object.entries(packageJson.dependencies).forEach(([name, version]) => {
        // 버전 문자열에서 ^, ~, >= 등의 접두사 제거
        const cleanVersion = version.replace(/^[~^>=<]+/, "");
        packages.push({
          name,
          version: cleanVersion,
          isDev: false,
        });
      });
    }

    // devDependencies 추출
    if (packageJson.devDependencies) {
      Object.entries(packageJson.devDependencies).forEach(([name, version]) => {
        // 버전 문자열에서 ^, ~, >= 등의 접두사 제거
        const cleanVersion = version.replace(/^[~^>=<]+/, "");
        packages.push({
          name,
          version: cleanVersion,
          isDev: true,
        });
      });
    }

    return packages;
  } catch (error) {
    console.error("package.json 파싱 오류:", error);
    throw new Error("유효하지 않은 package.json 형식입니다.");
  }
}

/**
 * npm registry API를 사용하여 패키지의 라이선스 정보를 조회합니다.
 */
export async function fetchLicenseInfo(
  packageInfo: PackageInfo
): Promise<LicenseInfo> {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/${packageInfo.name}`
    );

    if (!response.ok) {
      throw new Error(`패키지 정보를 가져올 수 없습니다: ${packageInfo.name}`);
    }

    const data = await response.json();

    // 특정 버전의 정보 가져오기
    const versionData =
      data.versions[packageInfo.version] ||
      data.versions[`${packageInfo.version}`] ||
      data["dist-tags"]?.latest
        ? data.versions[data["dist-tags"].latest]
        : null;

    if (!versionData) {
      throw new Error(
        `패키지 버전 정보를 찾을 수 없습니다: ${packageInfo.name}@${packageInfo.version}`
      );
    }

    // 라이선스 정보 추출
    let license = versionData.license || "Unknown";

    // 라이선스가 객체 형태인 경우 (예: { type: "MIT" })
    if (typeof license === "object" && license.type) {
      license = license.type;
    }

    return {
      name: packageInfo.name,
      version: packageInfo.version,
      license,
      licenseUrl: getLicenseUrl(license),
      repository: getRepositoryUrl(versionData.repository),
      homepage: versionData.homepage || null,
      isDev: packageInfo.isDev,
    };
  } catch (error) {
    console.error(`라이선스 정보 조회 오류 (${packageInfo.name}):`, error);
    return {
      name: packageInfo.name,
      version: packageInfo.version,
      license: "Unknown",
      isDev: packageInfo.isDev,
    };
  }
}

/**
 * 여러 패키지의 라이선스 정보를 병렬로 조회합니다.
 */
export async function fetchAllLicenseInfo(
  packages: PackageInfo[]
): Promise<LicenseInfo[]> {
  const licensePromises = packages.map((pkg) => fetchLicenseInfo(pkg));
  return Promise.all(licensePromises);
}

/**
 * 라이선스 유형에 따른 라이선스 URL을 반환합니다.
 */
function getLicenseUrl(license: string): string | undefined {
  const licenseUrls: Record<string, string> = {
    MIT: "https://opensource.org/licenses/MIT",
    "Apache-2.0": "https://opensource.org/licenses/Apache-2.0",
    "BSD-3-Clause": "https://opensource.org/licenses/BSD-3-Clause",
    "BSD-2-Clause": "https://opensource.org/licenses/BSD-2-Clause",
    "GPL-3.0": "https://opensource.org/licenses/GPL-3.0",
    "GPL-2.0": "https://opensource.org/licenses/GPL-2.0",
    "LGPL-3.0": "https://opensource.org/licenses/LGPL-3.0",
    "LGPL-2.1": "https://opensource.org/licenses/LGPL-2.1",
    ISC: "https://opensource.org/licenses/ISC",
    "MPL-2.0": "https://opensource.org/licenses/MPL-2.0",
    "CDDL-1.0": "https://opensource.org/licenses/CDDL-1.0",
    "EPL-2.0": "https://opensource.org/licenses/EPL-2.0",
    Unlicense: "https://unlicense.org/",
  };

  return licenseUrls[license];
}

/**
 * 저장소 정보에서 URL을 추출합니다.
 */
function getRepositoryUrl(
  repository: string | { url?: string } | undefined
): string | undefined {
  if (!repository) return undefined;

  if (typeof repository === "string") {
    return repository;
  }

  if (typeof repository === "object" && repository.url) {
    // git+https://github.com/user/repo.git 형식에서 .git 제거
    return repository.url.replace(/^git\+/, "").replace(/\.git$/, "");
  }

  return undefined;
}

/**
 * 라이선스 정보를 마크다운 형식으로 변환합니다.
 */
export function generateLicenseMarkdown(
  licenseInfoList: LicenseInfo[]
): string {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let markdown = `# 오픈소스 라이선스\n\n`;
  markdown += `이 문서는 ${formattedDate}에 생성되었습니다.\n\n`;

  // 프로덕션 의존성
  const prodDependencies = licenseInfoList.filter((pkg) => !pkg.isDev);
  if (prodDependencies.length > 0) {
    markdown += `## 프로덕션 의존성\n\n`;
    markdown += `| 패키지 | 버전 | 라이선스 | 저장소 |\n`;
    markdown += `| ------ | ---- | -------- | ------ |\n`;

    prodDependencies.forEach((pkg) => {
      const licenseText = pkg.licenseUrl
        ? `[${pkg.license}](${pkg.licenseUrl})`
        : pkg.license;

      const repoText = pkg.repository ? `[링크](${pkg.repository})` : "-";

      markdown += `| ${pkg.name} | ${pkg.version} | ${licenseText} | ${repoText} |\n`;
    });

    markdown += "\n";
  }

  // 개발 의존성
  const devDependencies = licenseInfoList.filter((pkg) => pkg.isDev);
  if (devDependencies.length > 0) {
    markdown += `## 개발 의존성\n\n`;
    markdown += `| 패키지 | 버전 | 라이선스 | 저장소 |\n`;
    markdown += `| ------ | ---- | -------- | ------ |\n`;

    devDependencies.forEach((pkg) => {
      const licenseText = pkg.licenseUrl
        ? `[${pkg.license}](${pkg.licenseUrl})`
        : pkg.license;

      const repoText = pkg.repository ? `[링크](${pkg.repository})` : "-";

      markdown += `| ${pkg.name} | ${pkg.version} | ${licenseText} | ${repoText} |\n`;
    });
  }

  return markdown;
}
