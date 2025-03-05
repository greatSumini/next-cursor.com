import { LicenseInfo } from "@/types/license";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

interface LicenseTableProps {
  licenseInfoList: LicenseInfo[];
}

export function LicenseTable({ licenseInfoList }: LicenseTableProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>패키지</TableHead>
            <TableHead>버전</TableHead>
            <TableHead>라이선스</TableHead>
            <TableHead>저장소</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {licenseInfoList.map((pkg) => (
            <TableRow key={`${pkg.name}-${pkg.version}`}>
              <TableCell className="font-medium">{pkg.name}</TableCell>
              <TableCell>{pkg.version}</TableCell>
              <TableCell>
                {pkg.licenseUrl ? (
                  <a
                    href={pkg.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    {pkg.license}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  pkg.license
                )}
              </TableCell>
              <TableCell>
                {pkg.repository ? (
                  <a
                    href={pkg.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    저장소
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
