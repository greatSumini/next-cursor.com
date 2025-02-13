export function generatePrompt() {
  const prompt = `
Write a detailed use case document based on PRD, IA, and following information:

Use case document must include the following contents:

<table-of-contents>
- Actor Definitions
- Use Case Scenarios
- Main Steps
- Exception Handling
- Comprehensive Actor Definitions
- Detailed Use Case Scenarios
- Main Steps and Flow of Events
- Alternative Flows and Edge Cases
- Preconditions and Postconditions
- Business Rules and Constraints
- Exception Handling Procedures
- User Interface Considerations
- Data Requirements and Data Flow
- Security and Privacy Considerations
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
- Include detailed step-by-step descriptions
- Consider error cases and alternative flows
- Include technical considerations
</guidelines>
`.trim();

  return prompt;
}
