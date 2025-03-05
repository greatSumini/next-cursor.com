"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PrivacyPolicyFormData } from "../types";

// 수집 항목 옵션
const REQUIRED_ITEMS = [
  { id: "email", label: "이메일 주소" },
  { id: "password", label: "비밀번호" },
  { id: "name", label: "이름" },
  { id: "nickname", label: "닉네임" },
  { id: "birthdate", label: "생년월일" },
  { id: "phone", label: "휴대폰 번호" },
  { id: "address", label: "주소" },
];

const OPTIONAL_ITEMS = [
  { id: "gender", label: "성별" },
  { id: "job", label: "직업" },
  { id: "company", label: "회사명" },
  { id: "profile", label: "프로필 이미지" },
  { id: "interests", label: "관심사" },
];

// 수집 방법 옵션
const COLLECT_METHODS = [
  { id: "website", label: "웹사이트 회원가입" },
  { id: "app", label: "모바일 앱 회원가입" },
  { id: "email", label: "이메일" },
  { id: "customer_service", label: "고객센터 상담" },
  { id: "board", label: "게시판" },
  { id: "event", label: "이벤트 참여" },
];

// 이용 목적 옵션
const USAGE_PURPOSES = [
  { id: "service", label: "서비스 제공 및 계약 이행" },
  { id: "improvement", label: "서비스 개선 및 신규 서비스 개발" },
  { id: "marketing", label: "마케팅 및 광고 활용" },
  { id: "event", label: "이벤트 및 행사 안내" },
  { id: "statistics", label: "인구통계학적 분석" },
  { id: "relationship", label: "이용자 간 관계 형성" },
];

export function PrivacyPolicyForm({
  onSubmit,
}: {
  onSubmit: (data: PrivacyPolicyFormData) => void;
}) {
  // 1. 서비스 제공자
  const [serviceName, setServiceName] = useState("");
  const [isFirstPolicy, setIsFirstPolicy] = useState(true);

  // 2. 수집할 개인정보
  const [requiredItems, setRequiredItems] = useState<string[]>([]);
  const [optionalItems, setOptionalItems] = useState<string[]>([]);
  const [customRequiredItems, setCustomRequiredItems] = useState("");
  const [customOptionalItems, setCustomOptionalItems] = useState("");

  // 3. 개인정보를 수집하는 방법
  const [collectMethods, setCollectMethods] = useState<string[]>([]);
  const [customCollectMethod, setCustomCollectMethod] = useState("");

  // 4. 개인정보의 이용 상황
  const [usagePurposes, setUsagePurposes] = useState<string[]>([]);
  const [customUsagePurpose, setCustomUsagePurpose] = useState("");

  // 5. 개인정보의 제3자 제공
  const [isProvidingToThirdParty, setIsProvidingToThirdParty] = useState(false);
  const [thirdPartyRecipient, setThirdPartyRecipient] = useState("");
  const [thirdPartyPurpose, setThirdPartyPurpose] = useState("");
  const [thirdPartyItems, setThirdPartyItems] = useState("");

  // 6. 개인정보의 처리 위탁
  const [isOutsourcing, setIsOutsourcing] = useState(false);
  const [outsourcingCompany, setOutsourcingCompany] = useState("");
  const [outsourcingScope, setOutsourcingScope] = useState("");

  // 7. 개인정보 보호 책임자 지정
  const [officerName, setOfficerName] = useState("");
  const [officerPosition, setOfficerPosition] = useState("");
  const [officerPhone, setOfficerPhone] = useState("");
  const [officerEmail, setOfficerEmail] = useState("");
  const [hasPrivacyManager, setHasPrivacyManager] = useState(false);
  const [hasPrivacyDepartment, setHasPrivacyDepartment] = useState(false);

  // 8. 수집된 개인정보의 관리 및 이용
  const [allowsUnder14, setAllowsUnder14] = useState(false);
  const [allowsWithdrawal, setAllowsWithdrawal] = useState(true);
  const [hasTechnicalProtection, setHasTechnicalProtection] = useState(true);
  const [notifiesDataBreach, setNotifiesDataBreach] = useState(true);
  const [hasOverseasTransfer, setHasOverseasTransfer] = useState(false);

  // 9. 시행일
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      serviceName,
      isFirstPolicy,
      collectItems: {
        required: requiredItems,
        optional: optionalItems,
        customRequired: customRequiredItems,
        customOptional: customOptionalItems,
      },
      collectMethods,
      customCollectMethod,
      usagePurposes,
      customUsagePurpose,
      isProvidingToThirdParty,
      thirdPartyInfo: {
        recipient: thirdPartyRecipient,
        purpose: thirdPartyPurpose,
        items: thirdPartyItems,
      },
      isOutsourcing,
      outsourcingInfo: {
        company: outsourcingCompany,
        scope: outsourcingScope,
      },
      privacyOfficer: {
        name: officerName,
        position: officerPosition,
        phone: officerPhone,
        email: officerEmail,
      },
      hasPrivacyManager,
      hasPrivacyDepartment,
      allowsUnder14,
      allowsWithdrawal,
      hasTechnicalProtection,
      notifiesDataBreach,
      hasOverseasTransfer,
      effectiveDate: date ? format(date, "yyyy-MM-dd") : "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. 서비스 제공자 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">1. 서비스 제공자</h2>

            <div className="space-y-2">
              <Label htmlFor="serviceName">정보통신서비스 제공자명</Label>
              <Input
                id="serviceName"
                placeholder="예: (주)어떤회사"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>본 방침의 제정 정보</Label>
              <RadioGroup
                value={isFirstPolicy ? "first" : "existing"}
                onValueChange={(value) => setIsFirstPolicy(value === "first")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="first" id="first" />
                  <Label htmlFor="first">본 방침을 처음으로 만듦</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="existing" id="existing" />
                  <Label htmlFor="existing">
                    기존의 개인정보처리방침이 있음
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. 수집할 개인정보 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">2. 수집할 개인정보</h2>

            <div className="space-y-2">
              <Label>필수 항목</Label>
              <div className="grid grid-cols-2 gap-2">
                {REQUIRED_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`required-${item.id}`}
                      checked={requiredItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setRequiredItems([...requiredItems, item.id]);
                        } else {
                          setRequiredItems(
                            requiredItems.filter((i) => i !== item.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`required-${item.id}`}>{item.label}</Label>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Label htmlFor="customRequiredItems">기타 직접 입력</Label>
                <Textarea
                  id="customRequiredItems"
                  placeholder="기타 필수 항목을 입력하세요 (쉼표로 구분)"
                  value={customRequiredItems}
                  onChange={(e) => setCustomRequiredItems(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>선택 항목</Label>
              <div className="grid grid-cols-2 gap-2">
                {OPTIONAL_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`optional-${item.id}`}
                      checked={optionalItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setOptionalItems([...optionalItems, item.id]);
                        } else {
                          setOptionalItems(
                            optionalItems.filter((i) => i !== item.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`optional-${item.id}`}>{item.label}</Label>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Label htmlFor="customOptionalItems">기타 직접 입력</Label>
                <Textarea
                  id="customOptionalItems"
                  placeholder="기타 선택 항목을 입력하세요 (쉼표로 구분)"
                  value={customOptionalItems}
                  onChange={(e) => setCustomOptionalItems(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. 개인정보를 수집하는 방법 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">3. 개인정보를 수집하는 방법</h2>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {COLLECT_METHODS.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`method-${method.id}`}
                      checked={collectMethods.includes(method.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCollectMethods([...collectMethods, method.id]);
                        } else {
                          setCollectMethods(
                            collectMethods.filter((i) => i !== method.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`method-${method.id}`}>
                      {method.label}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Label htmlFor="customCollectMethod">기타 직접 입력</Label>
                <Textarea
                  id="customCollectMethod"
                  placeholder="기타 수집 방법을 입력하세요"
                  value={customCollectMethod}
                  onChange={(e) => setCustomCollectMethod(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. 개인정보의 이용 상황 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">4. 개인정보의 이용 상황</h2>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {USAGE_PURPOSES.map((purpose) => (
                  <div key={purpose.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`purpose-${purpose.id}`}
                      checked={usagePurposes.includes(purpose.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setUsagePurposes([...usagePurposes, purpose.id]);
                        } else {
                          setUsagePurposes(
                            usagePurposes.filter((i) => i !== purpose.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`purpose-${purpose.id}`}>
                      {purpose.label}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Label htmlFor="customUsagePurpose">기타 직접 입력</Label>
                <Textarea
                  id="customUsagePurpose"
                  placeholder="기타 이용 목적을 입력하세요"
                  value={customUsagePurpose}
                  onChange={(e) => setCustomUsagePurpose(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. 개인정보의 제3자 제공 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">5. 개인정보의 제3자 제공</h2>

            <div className="space-y-2">
              <Label>제3자에게 개인정보를 제공하나요?</Label>
              <RadioGroup
                value={isProvidingToThirdParty ? "yes" : "no"}
                onValueChange={(value) =>
                  setIsProvidingToThirdParty(value === "yes")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="provide-yes" />
                  <Label htmlFor="provide-yes">네</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="provide-no" />
                  <Label htmlFor="provide-no">아니오</Label>
                </div>
              </RadioGroup>
            </div>

            {isProvidingToThirdParty && (
              <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="thirdPartyRecipient">제공받는 자</Label>
                  <Input
                    id="thirdPartyRecipient"
                    placeholder="예: (주)제휴회사"
                    value={thirdPartyRecipient}
                    onChange={(e) => setThirdPartyRecipient(e.target.value)}
                    required={isProvidingToThirdParty}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thirdPartyPurpose">제공 목적</Label>
                  <Input
                    id="thirdPartyPurpose"
                    placeholder="예: 마케팅 활용"
                    value={thirdPartyPurpose}
                    onChange={(e) => setThirdPartyPurpose(e.target.value)}
                    required={isProvidingToThirdParty}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thirdPartyItems">제공 항목</Label>
                  <Input
                    id="thirdPartyItems"
                    placeholder="예: 이름, 이메일, 휴대폰 번호"
                    value={thirdPartyItems}
                    onChange={(e) => setThirdPartyItems(e.target.value)}
                    required={isProvidingToThirdParty}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 6. 개인정보의 처리 위탁 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">6. 개인정보의 처리 위탁</h2>

            <div className="space-y-2">
              <Label>외부 업체에 개인정보 처리를 위탁하나요?</Label>
              <RadioGroup
                value={isOutsourcing ? "yes" : "no"}
                onValueChange={(value) => setIsOutsourcing(value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="outsource-yes" />
                  <Label htmlFor="outsource-yes">네</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="outsource-no" />
                  <Label htmlFor="outsource-no">아니오</Label>
                </div>
              </RadioGroup>
            </div>

            {isOutsourcing && (
              <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="outsourcingCompany">수탁업체명</Label>
                  <Input
                    id="outsourcingCompany"
                    placeholder="예: (주)결제대행사"
                    value={outsourcingCompany}
                    onChange={(e) => setOutsourcingCompany(e.target.value)}
                    required={isOutsourcing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outsourcingScope">위탁 범위</Label>
                  <Input
                    id="outsourcingScope"
                    placeholder="예: 결제 처리, 본인인증"
                    value={outsourcingScope}
                    onChange={(e) => setOutsourcingScope(e.target.value)}
                    required={isOutsourcing}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 7. 개인정보 보호 책임자 지정 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">7. 개인정보 보호 책임자 지정</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="officerName">성명</Label>
                <Input
                  id="officerName"
                  placeholder="예: 홍길동"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="officerPosition">직책</Label>
                <Input
                  id="officerPosition"
                  placeholder="예: 이사"
                  value={officerPosition}
                  onChange={(e) => setOfficerPosition(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="officerPhone">전화번호</Label>
                <Input
                  id="officerPhone"
                  placeholder="예: 02-1234-5678"
                  value={officerPhone}
                  onChange={(e) => setOfficerPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="officerEmail">이메일</Label>
                <Input
                  id="officerEmail"
                  placeholder="예: privacy@example.com"
                  value={officerEmail}
                  onChange={(e) => setOfficerEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPrivacyManager"
                  checked={hasPrivacyManager}
                  onCheckedChange={(checked) => setHasPrivacyManager(!!checked)}
                />
                <Label htmlFor="hasPrivacyManager">
                  개인정보 보호 담당자가 있음
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPrivacyDepartment"
                  checked={hasPrivacyDepartment}
                  onCheckedChange={(checked) =>
                    setHasPrivacyDepartment(!!checked)
                  }
                />
                <Label htmlFor="hasPrivacyDepartment">
                  개인정보보호 전담부서 운영
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 8. 수집된 개인정보의 관리 및 이용 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              8. 수집된 개인정보의 관리 및 이용
            </h2>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowsUnder14"
                  checked={allowsUnder14}
                  onCheckedChange={(checked) => setAllowsUnder14(!!checked)}
                />
                <Label htmlFor="allowsUnder14">
                  만 14세 미만 아동의 가입 허용
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowsWithdrawal"
                  checked={allowsWithdrawal}
                  onCheckedChange={(checked) => setAllowsWithdrawal(!!checked)}
                />
                <Label htmlFor="allowsWithdrawal">
                  개인정보 조회, 수집동의 철회 가능
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasTechnicalProtection"
                  checked={hasTechnicalProtection}
                  onCheckedChange={(checked) =>
                    setHasTechnicalProtection(!!checked)
                  }
                />
                <Label htmlFor="hasTechnicalProtection">
                  기술적·관리적 보호대책 마련
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notifiesDataBreach"
                  checked={notifiesDataBreach}
                  onCheckedChange={(checked) =>
                    setNotifiesDataBreach(!!checked)
                  }
                />
                <Label htmlFor="notifiesDataBreach">
                  개인정보 유출 시 통지·신고
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasOverseasTransfer"
                  checked={hasOverseasTransfer}
                  onCheckedChange={(checked) =>
                    setHasOverseasTransfer(!!checked)
                  }
                />
                <Label htmlFor="hasOverseasTransfer">
                  국외 이전 개인정보 보호조항 적용
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 9. 시행일 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">9. 시행일</h2>

            <div className="space-y-2">
              <Label>방침 시행일</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ko }) : "날짜 선택"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        생성하기
      </Button>
    </form>
  );
}
