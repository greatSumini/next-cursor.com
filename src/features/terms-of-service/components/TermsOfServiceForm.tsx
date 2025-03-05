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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TermsOfServiceFormData } from "../types";

// 회원가입 제한 사유 옵션
const REGISTRATION_RESTRICTIONS = [
  { id: "false_info", label: "허위 정보 기재" },
  { id: "previous_violation", label: "이전 약관 위반 이력" },
  { id: "minor_no_consent", label: "미성년자 법정대리인 동의 미확인" },
  { id: "no_verification", label: "실명 미인증" },
  { id: "illegal_usage", label: "부정 이용" },
];

// 광고 채널 옵션
const ADVERTISING_CHANNELS = [
  { id: "email", label: "이메일" },
  { id: "sms", label: "SMS" },
  { id: "push", label: "앱 푸시 알림" },
  { id: "inapp", label: "앱/웹 내 알림" },
];

// 결제 수단 옵션
const PAYMENT_OPTIONS = [
  { id: "card", label: "카드결제" },
  { id: "phone", label: "ARS, 휴대전화" },
  { id: "bank_transfer", label: "계좌이체" },
  { id: "e_money", label: "전자화폐" },
  { id: "gift_card", label: "상품권" },
];

// 관할법원 옵션
const JURISDICTION_COURTS = [
  { value: "company_location", label: "회사 소재지 관할법원" },
  { value: "seoul_central", label: "서울중앙지방법원" },
  { value: "user_location", label: "이용자 주소지 관할법원" },
  { value: "custom", label: "기타 (직접 입력)" },
];

export function TermsOfServiceForm({
  onSubmit,
}: {
  onSubmit: (data: TermsOfServiceFormData) => void;
}) {
  // 1. 서비스 공급자 및 제공 서비스
  const [companyName, setCompanyName] = useState("");
  const [representative, setRepresentative] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState<"free" | "paid" | "both">(
    "free"
  );
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [customPaymentMethod, setCustomPaymentMethod] = useState("");

  // 2. 회원가입에 대한 승낙
  const [hasRegistrationRestrictions, setHasRegistrationRestrictions] =
    useState(false);
  const [registrationRestrictions, setRegistrationRestrictions] = useState<
    string[]
  >([]);
  const [customRegistrationRestriction, setCustomRegistrationRestriction] =
    useState("");

  // 3. 제공하는 서비스
  const [providedServices, setProvidedServices] = useState("");

  // 4. 정보의 제공 및 광고의 게재
  const [allowsAdvertising, setAllowsAdvertising] = useState(false);
  const [advertisingChannels, setAdvertisingChannels] = useState<string[]>([]);
  const [customAdvertisingChannel, setCustomAdvertisingChannel] = useState("");

  // 5. 멤버십 포인트, 할인쿠폰
  const [hasPointSystem, setHasPointSystem] = useState(false);
  const [hasCouponSystem, setHasCouponSystem] = useState(false);
  const [pointPolicies, setPointPolicies] = useState("");
  const [couponPolicies, setCouponPolicies] = useState("");

  // 6. 결제수단 선택
  const [paymentOptions, setPaymentOptions] = useState<string[]>([]);
  const [customPaymentOption, setCustomPaymentOption] = useState("");

  // 7. 게시물 관리 및 지식재산권
  const [allowsContentCreation, setAllowsContentCreation] = useState(false);
  const [allowsContentUsage, setAllowsContentUsage] = useState(false);
  const [allowsDerivativeWorks, setAllowsDerivativeWorks] = useState(false);
  const [allowsPromotionalUse, setAllowsPromotionalUse] = useState(false);
  const [allowsServiceImprovement, setAllowsServiceImprovement] =
    useState(false);

  // 8. 관할법원
  const [jurisdictionCourt, setJurisdictionCourt] =
    useState("company_location");
  const [customJurisdictionCourt, setCustomJurisdictionCourt] = useState("");

  // 9. 시행일
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      serviceProvider: {
        companyName,
        representative,
        address,
      },
      serviceType,
      paymentMethods,
      customPaymentMethod,
      hasRegistrationRestrictions,
      registrationRestrictions,
      customRegistrationRestriction,
      providedServices,
      allowsAdvertising,
      advertisingChannels,
      customAdvertisingChannel,
      hasPointSystem,
      hasCouponSystem,
      pointPolicies,
      couponPolicies,
      paymentOptions,
      customPaymentOption,
      allowsContentCreation,
      allowsContentUsage,
      allowsDerivativeWorks,
      allowsPromotionalUse,
      allowsServiceImprovement,
      jurisdictionCourt:
        jurisdictionCourt === "custom"
          ? customJurisdictionCourt
          : jurisdictionCourt,
      effectiveDate: date ? format(date, "yyyy-MM-dd") : "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. 서비스 공급자 및 제공 서비스 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              1. 서비스 공급자 및 제공 서비스
            </h2>

            <div className="space-y-2">
              <Label htmlFor="companyName">서비스 공급자명</Label>
              <Input
                id="companyName"
                placeholder="예: (주)어썸데브"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="representative">대표자명</Label>
              <Input
                id="representative"
                placeholder="예: 홍길동"
                value={representative}
                onChange={(e) => setRepresentative(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">주소</Label>
              <Input
                id="address"
                placeholder="예: 서울특별시 강남구 테헤란로 123"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>서비스 유형</Label>
              <RadioGroup
                value={serviceType}
                onValueChange={(value) =>
                  setServiceType(value as "free" | "paid" | "both")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="free" />
                  <Label htmlFor="free">무료 서비스</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paid" id="paid" />
                  <Label htmlFor="paid">유료 서비스</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">무료 및 유료 서비스 모두 제공</Label>
                </div>
              </RadioGroup>
            </div>

            {(serviceType === "paid" || serviceType === "both") && (
              <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <Label>결제 방식</Label>
                <div className="grid grid-cols-2 gap-2">
                  {PAYMENT_OPTIONS.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`payment-method-${option.id}`}
                        checked={paymentMethods.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPaymentMethods([...paymentMethods, option.id]);
                          } else {
                            setPaymentMethods(
                              paymentMethods.filter((i) => i !== option.id)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={`payment-method-${option.id}`}>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Label htmlFor="customPaymentMethod">기타 직접 입력</Label>
                  <Input
                    id="customPaymentMethod"
                    placeholder="기타 결제 방식을 입력하세요"
                    value={customPaymentMethod}
                    onChange={(e) => setCustomPaymentMethod(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 2. 회원가입에 대한 승낙 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">2. 회원가입에 대한 승낙</h2>

            <div className="space-y-2">
              <Label>
                회원 가입을 보류하거나 제한할 수 있는 사유가 있나요?
              </Label>
              <RadioGroup
                value={hasRegistrationRestrictions ? "yes" : "no"}
                onValueChange={(value) =>
                  setHasRegistrationRestrictions(value === "yes")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="restrictions-yes" />
                  <Label htmlFor="restrictions-yes">네</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="restrictions-no" />
                  <Label htmlFor="restrictions-no">아니오</Label>
                </div>
              </RadioGroup>
            </div>

            {hasRegistrationRestrictions && (
              <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <Label>제한 사유</Label>
                <div className="grid grid-cols-2 gap-2">
                  {REGISTRATION_RESTRICTIONS.map((restriction) => (
                    <div
                      key={restriction.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`restriction-${restriction.id}`}
                        checked={registrationRestrictions.includes(
                          restriction.id
                        )}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setRegistrationRestrictions([
                              ...registrationRestrictions,
                              restriction.id,
                            ]);
                          } else {
                            setRegistrationRestrictions(
                              registrationRestrictions.filter(
                                (i) => i !== restriction.id
                              )
                            );
                          }
                        }}
                      />
                      <Label htmlFor={`restriction-${restriction.id}`}>
                        {restriction.label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Label htmlFor="customRegistrationRestriction">
                    기타 직접 입력
                  </Label>
                  <Textarea
                    id="customRegistrationRestriction"
                    placeholder="기타 제한 사유를 입력하세요"
                    value={customRegistrationRestriction}
                    onChange={(e) =>
                      setCustomRegistrationRestriction(e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. 제공하는 서비스 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">3. 제공하는 서비스</h2>

            <div className="space-y-2">
              <Label htmlFor="providedServices">제공하는 서비스 내용</Label>
              <Textarea
                id="providedServices"
                placeholder="예: 소셜 네트워킹, 콘텐츠 공유, 온라인 쇼핑 등 제공하는 서비스를 상세히 기술해주세요."
                value={providedServices}
                onChange={(e) => setProvidedServices(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. 정보의 제공 및 광고의 게재 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">4. 정보의 제공 및 광고의 게재</h2>

            <div className="space-y-2">
              <Label>광고성 메시지 전송 동의 여부</Label>
              <RadioGroup
                value={allowsAdvertising ? "yes" : "no"}
                onValueChange={(value) => setAllowsAdvertising(value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="advertising-yes" />
                  <Label htmlFor="advertising-yes">네</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="advertising-no" />
                  <Label htmlFor="advertising-no">아니오</Label>
                </div>
              </RadioGroup>
            </div>

            {allowsAdvertising && (
              <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <Label>전송 채널</Label>
                <div className="grid grid-cols-2 gap-2">
                  {ADVERTISING_CHANNELS.map((channel) => (
                    <div
                      key={channel.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`channel-${channel.id}`}
                        checked={advertisingChannels.includes(channel.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setAdvertisingChannels([
                              ...advertisingChannels,
                              channel.id,
                            ]);
                          } else {
                            setAdvertisingChannels(
                              advertisingChannels.filter(
                                (i) => i !== channel.id
                              )
                            );
                          }
                        }}
                      />
                      <Label htmlFor={`channel-${channel.id}`}>
                        {channel.label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Label htmlFor="customAdvertisingChannel">
                    기타 직접 입력
                  </Label>
                  <Input
                    id="customAdvertisingChannel"
                    placeholder="기타 광고 채널을 입력하세요"
                    value={customAdvertisingChannel}
                    onChange={(e) =>
                      setCustomAdvertisingChannel(e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 5. 멤버십 포인트, 할인쿠폰 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">5. 멤버십 포인트, 할인쿠폰</h2>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPointSystem"
                  checked={hasPointSystem}
                  onCheckedChange={(checked) => setHasPointSystem(!!checked)}
                />
                <Label htmlFor="hasPointSystem">멤버십 포인트 운영</Label>
              </div>

              {hasPointSystem && (
                <div className="pl-6 pt-2">
                  <Label htmlFor="pointPolicies">
                    포인트 적립 및 사용 정책
                  </Label>
                  <Textarea
                    id="pointPolicies"
                    placeholder="예: 구매 금액의 1% 적립, 1포인트 = 1원, 최소 1,000포인트부터 사용 가능 등"
                    value={pointPolicies}
                    onChange={(e) => setPointPolicies(e.target.value)}
                    required={hasPointSystem}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasCouponSystem"
                  checked={hasCouponSystem}
                  onCheckedChange={(checked) => setHasCouponSystem(!!checked)}
                />
                <Label htmlFor="hasCouponSystem">할인쿠폰 발행</Label>
              </div>

              {hasCouponSystem && (
                <div className="pl-6 pt-2">
                  <Label htmlFor="couponPolicies">쿠폰 발행 및 사용 정책</Label>
                  <Textarea
                    id="couponPolicies"
                    placeholder="예: 신규 가입 시 10% 할인쿠폰 지급, 쿠폰 유효기간 30일, 중복 사용 불가 등"
                    value={couponPolicies}
                    onChange={(e) => setCouponPolicies(e.target.value)}
                    required={hasCouponSystem}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6. 결제수단 선택 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">6. 결제수단 선택</h2>

            <div className="space-y-2">
              <Label>결제 수단</Label>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_OPTIONS.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`payment-option-${option.id}`}
                      checked={paymentOptions.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPaymentOptions([...paymentOptions, option.id]);
                        } else {
                          setPaymentOptions(
                            paymentOptions.filter((i) => i !== option.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`payment-option-${option.id}`}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Label htmlFor="customPaymentOption">기타 직접 입력</Label>
                <Input
                  id="customPaymentOption"
                  placeholder="기타 결제 수단을 입력하세요"
                  value={customPaymentOption}
                  onChange={(e) => setCustomPaymentOption(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7. 게시물 관리 및 지식재산권 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">7. 게시물 관리 및 지식재산권</h2>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowsContentCreation"
                  checked={allowsContentCreation}
                  onCheckedChange={(checked) =>
                    setAllowsContentCreation(!!checked)
                  }
                />
                <Label htmlFor="allowsContentCreation">
                  게시판/콘텐츠 작성 기능 제공
                </Label>
              </div>
            </div>

            {allowsContentCreation && (
              <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowsContentUsage"
                    checked={allowsContentUsage}
                    onCheckedChange={(checked) =>
                      setAllowsContentUsage(!!checked)
                    }
                  />
                  <Label htmlFor="allowsContentUsage">
                    이용자 콘텐츠 활용 허용
                  </Label>
                </div>

                {allowsContentUsage && (
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowsDerivativeWorks"
                        checked={allowsDerivativeWorks}
                        onCheckedChange={(checked) =>
                          setAllowsDerivativeWorks(!!checked)
                        }
                      />
                      <Label htmlFor="allowsDerivativeWorks">
                        2차적 저작물 작성 허용
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowsPromotionalUse"
                        checked={allowsPromotionalUse}
                        onCheckedChange={(checked) =>
                          setAllowsPromotionalUse(!!checked)
                        }
                      />
                      <Label htmlFor="allowsPromotionalUse">
                        미디어·통신사 홍보 활용 허용
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowsServiceImprovement"
                        checked={allowsServiceImprovement}
                        onCheckedChange={(checked) =>
                          setAllowsServiceImprovement(!!checked)
                        }
                      />
                      <Label htmlFor="allowsServiceImprovement">
                        서비스 개선·신규 개발 활용 허용
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 8. 관할법원 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">8. 관할법원</h2>

            <div className="space-y-2">
              <Label htmlFor="jurisdictionCourt">분쟁 발생 시 관할법원</Label>
              <Select
                value={jurisdictionCourt}
                onValueChange={setJurisdictionCourt}
              >
                <SelectTrigger>
                  <SelectValue placeholder="관할법원 선택" />
                </SelectTrigger>
                <SelectContent>
                  {JURISDICTION_COURTS.map((court) => (
                    <SelectItem key={court.value} value={court.value}>
                      {court.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {jurisdictionCourt === "custom" && (
                <div className="pt-2">
                  <Label htmlFor="customJurisdictionCourt">직접 입력</Label>
                  <Input
                    id="customJurisdictionCourt"
                    placeholder="관할법원을 직접 입력하세요"
                    value={customJurisdictionCourt}
                    onChange={(e) => setCustomJurisdictionCourt(e.target.value)}
                    required={jurisdictionCourt === "custom"}
                  />
                </div>
              )}
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
              <Label>약관 시행일</Label>
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

      <div className="text-sm text-muted-foreground">
        본 서비스가 제공하는 자동작성 프로그램, UI/UX, 콘텐츠, 디자인 등은
        특허법·저작권법 등에 의해 보호 받습니다.
      </div>

      <Button type="submit" className="w-full">
        생성하기
      </Button>
    </form>
  );
}
