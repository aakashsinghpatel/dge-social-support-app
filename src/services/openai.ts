import { OpenAiClient } from "../utils/axiosClient";


/* 
* generateAIText
* method to generate OPENAI chat compeletion based response
* based on user input
* Any type of failure during API call will be handled by error handler 
* and return user friendly message by interceptor
*/
export const generateAIText = async (prompt: string) => {
  const response = await OpenAiClient.post("/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  const content = response?.data?.choices?.[0]?.message?.content;

  // Fallback if no content found in response
  if (!content || content.trim().length === 0) {
    throw new Error("No Suggestion found. Please try again.");
  }

  return content;
};
