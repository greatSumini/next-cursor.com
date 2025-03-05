import { PrivacyPolicyFormData } from "../types";

// 수집 항목 레이블 매핑
const REQUIRED_ITEMS_LABELS: Record<string, string> = {
  email: "이메일 주소",
  password: "비밀번호",
  name: "이름",
  nickname: "닉네임",
  birthdate: "생년월일",
  phone: "휴대폰 번호",
  address: "주소",
};

const OPTIONAL_ITEMS_LABELS: Record<string, string> = {
  gender: "성별",
  job: "직업",
  company: "회사명",
  profile: "프로필 이미지",
  interests: "관심사",
};

// 수집 방법 레이블 매핑
const COLLECT_METHODS_LABELS: Record<string, string> = {
  website: "웹사이트 회원가입",
  app: "모바일 앱 회원가입",
  email: "이메일",
  customer_service: "고객센터 상담",
  board: "게시판",
  event: "이벤트 참여",
};

// 이용 목적 레이블 매핑
const USAGE_PURPOSES_LABELS: Record<string, string> = {
  service: "서비스 제공 및 계약 이행",
  improvement: "서비스 개선 및 신규 서비스 개발",
  marketing: "마케팅 및 광고 활용",
  event: "이벤트 및 행사 안내",
  statistics: "인구통계학적 분석",
  relationship: "이용자 간 관계 형성",
};

export function generatePrivacyPolicy(data: PrivacyPolicyFormData): string {
  const {
    serviceName,
    isFirstPolicy,
    collectItems,
    collectMethods,
    customCollectMethod,
    usagePurposes,
    customUsagePurpose,
    isProvidingToThirdParty,
    thirdPartyInfo,
    isOutsourcing,
    outsourcingInfo,
    privacyOfficer,
    hasPrivacyManager,
    hasPrivacyDepartment,
    allowsUnder14,
    allowsWithdrawal,
    hasTechnicalProtection,
    notifiesDataBreach,
    hasOverseasTransfer,
    effectiveDate,
  } = data;

  // 필수 항목 문자열 생성
  const requiredItemsStr = collectItems.required
    .map((item) => REQUIRED_ITEMS_LABELS[item])
    .concat(
      collectItems.customRequired
        ? collectItems.customRequired.split(",").map((item) => item.trim())
        : []
    )
    .filter(Boolean)
    .join(", ");

  // 선택 항목 문자열 생성
  const optionalItemsStr = collectItems.optional
    .map((item) => OPTIONAL_ITEMS_LABELS[item])
    .concat(
      collectItems.customOptional
        ? collectItems.customOptional.split(",").map((item) => item.trim())
        : []
    )
    .filter(Boolean)
    .join(", ");

  // 수집 방법 문자열 생성
  const collectMethodsStr = collectMethods
    .map((method) => COLLECT_METHODS_LABELS[method])
    .filter(Boolean)
    .join(", ");

  // 이용 목적 문자열 생성
  const usagePurposesStr = usagePurposes
    .map((purpose) => USAGE_PURPOSES_LABELS[purpose])
    .filter(Boolean)
    .join(", ");

  // 개인정보처리방침 생성
  return `# 개인정보처리방침

${serviceName}(이하 '회사'라 함)은 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.

## 제1조 (개인정보의 처리 목적)

회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

1. ${usagePurposesStr}${customUsagePurpose ? `, ${customUsagePurpose}` : ""}

## 제2조 (개인정보의 처리 및 보유 기간)

회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

1. 회원 가입 및 관리: 회원 탈퇴 시까지
2. 재화 또는 서비스 제공: 서비스 공급완료 및 요금결제·정산 완료시까지
3. 법령에서 정한 기간

## 제3조 (개인정보의 수집 항목 및 수집 방법)

회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집하고 있습니다.

1. 수집항목
   - 필수항목: ${requiredItemsStr || "없음"}
   - 선택항목: ${optionalItemsStr || "없음"}

2. 수집방법
   - ${collectMethodsStr}${
    customCollectMethod ? `, ${customCollectMethod}` : ""
  }

## 제4조 (개인정보의 제3자 제공)

${
  isProvidingToThirdParty
    ? `회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

1. 개인정보를 제공받는 자: ${thirdPartyInfo.recipient}
2. 제공받는 자의 개인정보 이용목적: ${thirdPartyInfo.purpose}
3. 제공하는 개인정보 항목: ${thirdPartyInfo.items}
4. 제공받는 자의 보유·이용기간: 제공 목적 달성 시까지`
    : "회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다. 현재 회사는 이용자의 개인정보를 제3자에게 제공하고 있지 않습니다."
}

## 제5조 (개인정보처리 위탁)

${
  isOutsourcing
    ? `회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.

1. 위탁받는 자(수탁자): ${outsourcingInfo.company}
2. 위탁하는 업무의 내용: ${outsourcingInfo.scope}

회사는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.`
    : "회사는 현재 외부에 개인정보 처리를 위탁하고 있지 않습니다. 향후 위탁 필요가 발생할 경우, 위탁 대상자와 위탁 업무 내용에 대해 정보주체에게 통지하고 필요한 경우 사전 동의를 받도록 하겠습니다."
}

## 제6조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)

정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
${
  allowsUnder14
    ? `
만 14세 미만 아동의 경우, 법정대리인이 아동의 개인정보에 대한 열람, 정정·삭제, 처리정지 등의 요청을 할 수 있습니다.`
    : ""
}
${
  allowsWithdrawal
    ? `
정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.`
    : ""
}

## 제7조 (개인정보의 파기)

회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.

1. 파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
2. 파기방법: 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.

## 제8조 (개인정보의 안전성 확보 조치)

${
  hasTechnicalProtection
    ? `회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.

1. 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등
2. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치
3. 물리적 조치: 전산실, 자료보관실 등의 접근통제`
    : "회사는 개인정보보호법 제29조에 따라 개인정보의 안전성 확보를 위해 필요한 관리적, 기술적, 물리적 조치를 취하고 있습니다."
}

## 제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)

회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에게 보내는 소량의 정보이며 이용자의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.

1. 쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
2. 쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.
3. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.

## 제10조 (개인정보 보호책임자)

회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

- 개인정보 보호책임자
  - 성명: ${privacyOfficer.name}
  - 직책: ${privacyOfficer.position}
  - 연락처: ${privacyOfficer.phone}, ${privacyOfficer.email}

${
  hasPrivacyManager
    ? `- 개인정보 보호 담당자
  - 담당부서: 개인정보보호팀
  - 연락처: 상기 개인정보 보호책임자에게 연락바랍니다.`
    : ""
}

${
  hasPrivacyDepartment
    ? `- 개인정보보호 전담부서
  - 부서명: 개인정보보호팀
  - 연락처: 상기 개인정보 보호책임자에게 연락바랍니다.`
    : ""
}

## 제11조 (개인정보 열람청구)

정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.

- 개인정보 열람청구 접수·처리 부서
  - 부서명: ${hasPrivacyDepartment ? "개인정보보호팀" : "고객센터"}
  - 담당자: ${privacyOfficer.name}
  - 연락처: ${privacyOfficer.phone}, ${privacyOfficer.email}

## 제12조 (권익침해 구제방법)

정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.

1. 개인정보분쟁조정위원회: 1833-6972 (www.kopico.go.kr)
2. 개인정보침해신고센터: 118 (privacy.kisa.or.kr)
3. 대검찰청: 1301 (www.spo.go.kr)
4. 경찰청: 182 (ecrm.cyber.go.kr)

${
  notifiesDataBreach
    ? `
## 제13조 (개인정보 유출 통지)

회사는 개인정보의 유출이 발생한 경우에는 지체 없이 해당 정보주체에게 그 사실을 알리고, 개인정보 보호법 제34조에 따라 관계기관에 신고하겠습니다.`
    : ""
}

${
  hasOverseasTransfer
    ? `
## 제14조 (국외 이전 개인정보)

회사는 서비스 제공 및 향상을 위해 이용자의 개인정보를 국외로 이전할 수 있습니다. 이 경우 회사는 개인정보 보호법 제39조의12 등 관련 법령에 따라 보호조치를 취하고 이용자에게 알리겠습니다.`
    : ""
}

## 제${
    notifiesDataBreach ? "15" : hasOverseasTransfer ? "15" : "13"
  }조 (개인정보 처리방침 변경)

이 개인정보처리방침은 ${effectiveDate}부터 적용됩니다.
${
  !isFirstPolicy
    ? `이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.
- 이전 개인정보 처리방침 보기 (링크)`
    : ""
}`;
}
