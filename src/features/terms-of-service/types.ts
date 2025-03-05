export interface TermsOfServiceFormData {
  // 1. 서비스 공급자 및 제공 서비스
  serviceProvider: {
    companyName: string;
    representative: string;
    address: string;
  };
  serviceType: "free" | "paid" | "both";
  paymentMethods: string[];
  customPaymentMethod: string;

  // 2. 회원가입에 대한 승낙
  hasRegistrationRestrictions: boolean;
  registrationRestrictions: string[];
  customRegistrationRestriction: string;

  // 3. 제공하는 서비스
  providedServices: string;

  // 4. 정보의 제공 및 광고의 게재
  allowsAdvertising: boolean;
  advertisingChannels: string[];
  customAdvertisingChannel: string;

  // 5. 멤버십 포인트, 할인쿠폰
  hasPointSystem: boolean;
  hasCouponSystem: boolean;
  pointPolicies: string;
  couponPolicies: string;

  // 6. 결제수단 선택
  paymentOptions: string[];
  customPaymentOption: string;

  // 7. 게시물 관리 및 지식재산권
  allowsContentCreation: boolean;
  allowsContentUsage: boolean;
  allowsDerivativeWorks: boolean;
  allowsPromotionalUse: boolean;
  allowsServiceImprovement: boolean;

  // 8. 관할법원
  jurisdictionCourt: string;

  // 9. 시행일
  effectiveDate: string;
}
