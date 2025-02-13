import { isEmptyStringOrNil } from "@/lib/string";
import { PRDFormData } from "../types";

export function generatePrompt(data: PRDFormData) {
  const prompt = `
Write a PRD document based on the following information:

<product-overview>
${data.overview}
</product-overview>

${
  isEmptyStringOrNil(data.reference)
    ? ""
    : `<references>
${data.reference}
</references>\n\n`
}<must-features>
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
</tech-stack>\n\n`
}PRD must include the following contents:

<table-of-contents>
- Detailed product description
- Reference Services with detailed rationale
- Core features and specifications
- Suggested additional features
- User persona and scenarios
- Technical stack recommendations
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
- Do not include detailed data structure and storage design
</guidelines>
`.trim();

  return prompt;
}
