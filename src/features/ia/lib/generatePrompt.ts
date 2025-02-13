import { IAFormData } from "../types";

export function generatePrompt(data: IAFormData) {
  const prompt = `
Write an Information Architecture document based on PRD, and following information:

<navigation-type>
${data.navigationType}
</navigation-type>

<auth-type>
${data.authType}
</auth-type>

IA document must include the following contents:

<table-of-contents>
- Site Map
- User Flow
- Navigation Structure
- Page Hierarchy
- Content Organization
- Interaction Patterns
- URL Structure
- Component Hierarchy
</table-of-contents>

<response-format>
Use markdown format
</response-format>

<guidelines>
- Use tables or lists where appropriate to organize information systematically
- All user interactions, including inputs and outputs, must be in Korean
- Provide accurate answers with reliable references
- Write in Korean
- Clearly separate each section
- Consider user experience and accessibility
- Include responsive design considerations
- Consider SEO best practices
</guidelines>
`.trim();

  return prompt;
}
