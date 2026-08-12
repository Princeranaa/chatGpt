import  { tavily } from "@tavily/core";
const client = tavily({
  apiKey: process.env.Tavily_API_KEY,
});

export const searchInternet =async (query)=>{
    const response = await client.search(query,{
        maxResults:5,
        searchDepth:"advanced"
    })
    return response;
}


// client
//   .search("", {
//     searchDepth: "advanced",
//   })
//   .then(console.log);
