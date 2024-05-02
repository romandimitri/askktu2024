import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
 apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
 try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();

    // Check if result.data is not undefined and is an array
    if (!result.data || !Array.isArray(result.data)) {
      console.error('Unexpected response structure:', result);
      throw new Error('API response does not contain expected data');
    }

    // Check if the first element of result.data has an embedding property
    if (!result.data[0].embedding) {
      console.error('Unexpected data structure:', result.data[0]);
      throw new Error('API response does not contain expected embedding data');
    }

    // Assuming result.data[0].embedding is the array of numbers you're interested in
    return result.data[0].embedding as number[];
 } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
 }
}
