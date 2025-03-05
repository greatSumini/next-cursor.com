export interface PrivacyPolicyFormData {
  // 1. 서비스 제공자
  serviceName: string;
  isFirstPolicy: boolean;

  // 2. 수집할 개인정보
  collectItems: {
    required: string[];
    optional: string[];
    customRequired: string;
    customOptional: string;
  };

  // 3. 개인정보를 수집하는 방법
  collectMethods: string[];
  customCollectMethod: string;

  // 4. 개인정보의 이용 상황
  usagePurposes: string[];
  customUsagePurpose: string;

  // 5. 개인정보의 제3자 제공
  isProvidingToThirdParty: boolean;
  thirdPartyInfo: {
    recipient: string;
    purpose: string;
    items: string;
  };

  // 6. 개인정보의 처리 위탁
  isOutsourcing: boolean;
  outsourcingInfo: {
    company: string;
    scope: string;
  };

  // 7. 개인정보 보호 책임자 지정
  privacyOfficer: {
    name: string;
    position: string;
    phone: string;
    email: string;
  };
  hasPrivacyManager: boolean;
  hasPrivacyDepartment: boolean;

  // 8. 수집된 개인정보의 관리 및 이용
  allowsUnder14: boolean;
  allowsWithdrawal: boolean;
  hasTechnicalProtection: boolean;
  notifiesDataBreach: boolean;
  hasOverseasTransfer: boolean;

  // 9. 시행일
  effectiveDate: string;
}
