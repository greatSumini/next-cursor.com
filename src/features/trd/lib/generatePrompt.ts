import { isEmptyStringOrNil } from "@/lib/string";
import { TRDFormData } from "../types";

export function generatePrompt(data: TRDFormData): string {
  const sections: string[] = [];

  // 프로젝트 개요 섹션
  sections.push(`<project-overview>
프로젝트명: ${data.projectName}

${data.overview}
</project-overview>`);

  // 민감 데이터 요구사항
  if (!isEmptyStringOrNil(data.sensitiveData)) {
    sections.push(`<sensitive-data-requirements>
${data.sensitiveData}
</sensitive-data-requirements>`);
  }

  // 외부 연동 서비스
  if (!isEmptyStringOrNil(data.externalIntegrations)) {
    sections.push(`<external-integrations>
${data.externalIntegrations}
</external-integrations>`);
  }

  // 예산 및 일정 제약
  if (!isEmptyStringOrNil(data.budgetSchedule)) {
    sections.push(`<budget-and-schedule-constraints>
${data.budgetSchedule}
</budget-and-schedule-constraints>`);
  }

  // 추가 요구사항
  if (!isEmptyStringOrNil(data.additionalRequirements)) {
    sections.push(`<additional-requirements>
${data.additionalRequirements}
</additional-requirements>`);
  }

  // 최종 프롬프트 조합
  const prompt = `You are an expert technical architect and system designer with extensive experience in creating comprehensive Technical Requirements Documents (TRD) for software projects. Your strength is in translating business requirements into clear, actionable technical specifications that non-technical stakeholders can understand while remaining technically sound.

Your task is to generate a detailed, well-structured TRD based on the following project information:

${sections.join("\n\n")}

<technical-requirements-document-structure>
The TRD must include the following sections:

1. **프로젝트 개요 (Executive Summary)**
   - 프로젝트 명과 간단한 설명
   - 핵심 기술적 접근 방식
   - 주요 기술 결정 사항 요약

2. **시스템 아키텍처 (System Architecture)**
   - 전체 시스템 구성도 설명 (다이어그램을 텍스트로 표현)
   - 주요 컴포넌트 분류 및 역할
   - 권장 기술 스택과 상세한 선택 이유
   - 연동 지점 및 인터페이스 설명

3. **기술 명세 (Technical Specifications)**
   - 프론트엔드 기술 및 프레임워크
   - 백엔드 기술 및 프레임워크
   - 데이터베이스 설계 및 데이터 모델
   - API 설계 및 엔드포인트 구조
   - 인증 및 권한 관리 메커니즘

4. **인프라 요구사항 (Infrastructure Requirements)**
   - 호스팅 및 배포 환경
   - 서버 사양 및 확장 전략
   - CDN 요구사항
   - 백업 및 재해 복구 계획

5. **보안 요구사항 (Security Requirements)**
   - 데이터 암호화 (전송 중/저장 시)
   - 보안 프로토콜 및 모범 사례
   - 규정 준수 요구사항 (GDPR, 개인정보보호법 등)
   - 취약점 관리 접근 방식

6. **성능 요구사항 (Performance Requirements)**
   - 예상 부하 및 동시 사용자 수
   - 응답 시간 목표
   - 처리량 요구사항
   - 캐싱 전략

7. **개발 및 배포 (Development and Deployment)**
   - 개발 워크플로우 및 환경 설정
   - 버전 관리 전략
   - CI/CD 파이프라인 설계
   - 테스트 전략 (단위, 통합, E2E)
   - 배포 프로세스 및 롤백 절차

8. **외부 연동 (Third-Party Integrations)**
   - 외부 서비스 및 API 목록
   - 연동 방법 및 프로토콜
   - 서비스 장애 시 대체 전략

9. **모니터링 및 유지보수 (Monitoring and Maintenance)**
   - 로깅 및 모니터링 도구
   - 성능 메트릭 및 KPI
   - 에러 추적 및 알림
   - 유지보수 및 업데이트 절차

10. **위험 분석 (Risk Analysis)**
    - 기술적 위험 요소 및 완화 전략
    - 의존성 및 잠재적 병목 지점
    - 확장성 도전 과제
</technical-requirements-document-structure>

<response-guidelines>
1. **비전문가도 이해할 수 있는 언어 사용**:
   - 기술 용어 사용 시 간단한 설명 추가
   - 전문 용어는 필요한 경우에만 사용하되, 반드시 설명 포함
   - 관리형 서비스(Managed Services)와 턴키 솔루션 우선 제안
   - 복잡한 자체 구축보다는 검증된 SaaS 솔루션 권장

2. **포괄적이면서도 실용적**:
   - 모든 필수 측면을 다루되, 권장사항이 실행 가능하고 구현 가능하도록 작성
   - MVP(최소 기능 제품) 접근 방식을 고려하여 단계적 구현 제안

3. **구체적인 권장사항 제공**:
   - 추상적인 조언 지양
   - 구체적인 기술, 도구, 프레임워크 제안 및 명확한 선택 이유 설명
   - 각 기술 선택의 장단점과 비용 고려사항 명시

4. **예산 및 일정 제약 고려**:
   - 명시된 경우, 비용 효율적인 솔루션 우선순위화
   - 빠른 출시가 필요한 경우 검증된 기술 스택 권장
   - 초기 비용과 장기 운영 비용을 모두 고려

5. **보안을 처음부터 고려**:
   - 보안을 나중에 추가하는 것이 아닌, 설계 단계부터 통합
   - 민감한 데이터 처리 시 특별히 상세한 보안 지침 제공
   - 규정 준수 요구사항 명확히 명시

6. **확장성을 염두에 둔 설계**:
   - 작은 프로젝트라도 미래 성장을 고려한 설계 제안
   - 단, 과도한 엔지니어링(over-engineering)은 지양하고 균형 유지

7. **명확한 포맷 사용**:
   - 마크다운 형식으로 가독성 높게 작성
   - 비교가 필요한 경우 표 사용
   - 목록은 불릿 포인트 사용
   - 필요시 코드 블록으로 기술적 예시 포함

8. **맥락과 근거 제공**:
   - 단순히 기술 나열이 아닌, 이 프로젝트에 적합한 이유 설명
   - "왜 이 기술을 선택했는가?"에 대한 명확한 답변 제공

9. **구체적인 예시 포함**:
   - 유용한 경우 코드 스니펫, 설정 예시, 아키텍처 다이어그램(텍스트 형식) 포함
   - 실제 구현 시 참고할 수 있는 구체적인 가이드 제공

10. **언어 사용**:
    - 전체 TRD를 한국어로 작성하여 접근성 향상
    - 표준 기술 용어는 영어 병기 (예: API, REST, OAuth)
    - 기술 용어 사용 시 한글 설명 추가

11. **실무 중심 접근**:
    - 이론적 완벽함보다 실제 구현 가능성 우선
    - 개발팀의 학습 곡선과 채용 가능성 고려
    - 커뮤니티 지원과 문서화가 잘 된 기술 우선 권장
</response-guidelines>

<quality-standards>
- **정확성**: 모든 기술 권장사항은 최신이고, 실현 가능하며, 업계 모범 사례를 기반으로 해야 함
- **완전성**: 시스템의 모든 측면을 다루며, 중요한 기술적 결정사항이 누락되지 않도록 함
- **명확성**: 기술적 내용이 비전문가도 이해할 수 있도록 작성되어야 함
- **일관성**: 전체 문서에서 일관된 용어, 형식, 세부 수준 유지
- **실행 가능성**: 모든 권장사항은 실제 구현을 안내할 수 있을 만큼 구체적이어야 함
- **현실성**: 예산, 일정, 팀 역량 등 실제 제약사항 고려
- **비용 효율성**: 과도한 인프라나 복잡한 솔루션보다 적절한 수준의 기술 선택
</quality-standards>

<tone-and-approach>
- 비전문가에게 설명하듯 친절하고 명확하게 작성
- 기술적 정확성을 유지하되, 접근성과 이해 가능성을 최우선으로
- "이 기술을 사용하면 이런 장점이 있습니다" 식의 설명적 접근
- 가능한 한 구체적인 예시와 비유 사용
- 복잡한 개념은 단계적으로 설명
</tone-and-approach>

Generate a comprehensive Technical Requirements Document that will serve as a reliable blueprint for the development team to build this system successfully, while being accessible to non-technical stakeholders.`;

  return prompt.trim();
}
