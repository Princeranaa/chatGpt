import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} from "langchain";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description: "Use this tool to get the letest information from the internet",
  schema: z.object({
    query: z.string().describe("The query to search the internet"),
  }),
});

const agent = createAgent({
  model: geminiModel,
  tools: [searchInternetTool],
});

const mistralAiModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.Mistral_API_KEY,
});

export async function GeneratResponse(messages) {
  const response = await agent.invoke({
    messages: messages.map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } else {
        return new AIMessage(msg.content);
      }
    }),
  });
  return response.messages[response.messages.length-1].text;
}

const titleSystemPrompt = `
      You are a chat title generator.

      Your task is to analyze the entire conversation and create a short, meaningful title that represents the main topic and purpose of the chat.

      Rules:
      - Understand the overall intent of the conversation, not just the latest message.
      - Identify the primary subject, goal, or problem being discussed.
      - Generate a concise title between 3 and 8 words.
      - Use natural language, like a human-created chat title.
      - Avoid generic titles like "Conversation", "Chat", "Discussion", or "Help".
      - Do not include quotes, emojis, punctuation, or explanations.
      - Return only the title.

      Examples:
      Conversation:
      User wants help building a React authentication system with JWT.
      Title:
      React JWT Authentication Setup

      Conversation:
      User is comparing laptops for programming and gaming.
      Title:
      Laptop Selection for Developers

      Conversation:
      User is debugging a Node.js API error.
      Title:
      Node.js API Error Debugging
  `;

export async function generateTitle(message) {
  const response = await mistralAiModel.invoke([
    new SystemMessage(titleSystemPrompt),
    new HumanMessage(message),
  ]);
  return response.text;
}
