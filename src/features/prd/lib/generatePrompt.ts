import { isEmptyStringOrNil } from "@/lib/string";
import { PRDFormData } from "../types";

export function generatePrompt(data: PRDFormData) {
  const prompt = `
Write a PRD document based on the following information:

<product-overview>
${data.overview}
</product-overview>

<references>
${data.references.map((ref) => `- ${ref}`).join("\n")}
</references>

<must-features>
${data.features.map((feature) => `- ${feature}`).join("\n")}
</must-features>

<target-user-persona>
${data.targetUsers}
</target-user-persona>

<target-platforms>
${data.platforms.map((platform) => `- ${platform}`).join("\n")}
</target-platforms>

<storage-type>
${data.storageType}
</storage-type>

${
  isEmptyStringOrNil(data.techStack)
    ? ""
    : `<tech-stack>
${data.techStack}
</tech-stack>`
}

위 정보를 바탕으로 다음 내용이 포함된 PRD를 작성해주세요:
PRD must include the following contents:

<table-of-contents>
- Detailed product description
- Reference Services with detailed rationale
- Core features and specifications
- Suggested additional features
- User persona and scenarios
- Technical stack recommendations
- Data structure and storage design
</table-of-contents>

<response-format>
Use markdown format
</response-format>

<guidelines>
- Use tables or lists where appropriate to organize information systematically.
- All user interactions, including inputs and outputs, must be in Korean.
- Provide accurate answers with reliable references
- Write in Korean
- Clearly separate each section
- Collect additional reference services and provide detailed rationale
</guidelines>
`.trim();

  return prompt;
}
