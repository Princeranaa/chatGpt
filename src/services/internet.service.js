import { tavily } from "@tavily/core";

const client = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export const searchInternet = async ({ query }) => {
  try {
    console.log("Tavily query:", query);

    const response = await client.search(query, {
      maxResults: 5,
      searchDepth: "advanced",
      topic: "news",
      timeRange: "week",
    });

    console.log("Tavily response:", response);

    return response;
  } catch (error) {
    console.error("Tavily error:", error);
    throw new Error(`Internet search failed: ${error.message}`);
  }
};

// client
//   .search("", {
//     searchDepth: "advanced",
//   })
//   .then(console.log);
