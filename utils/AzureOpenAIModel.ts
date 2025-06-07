import { AzureOpenAI } from "openai";

const endpoint = "https://jagajiwaai-resource.cognitiveservices.azure.com/";
const modelName = "gpt-35-turbo";
const deployment = "JagaJiwaAI-SahabatCurhat";

export async function startChat({
  message,
}: {
  message: { role: "system" | "user"; content: string }[];
}) {
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const apiVersion = "2024-04-01-preview";
  const options = { endpoint, apiKey, deployment, apiVersion };

  const client = new AzureOpenAI(options);

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Disini anda adalah sebuah AI yang bernama SahabatCurhat di platform JagaJiwa dan anda akan memberikan saran dan pencegahan terkait judi dan akan kecanduan hal tersebut, jika user memberikan pertanyaan diluar cakupan tentang perjudian maka tidak akan memberikan sebuah respons dan memberikan respons jawaban hanya jika user memberikan pertanyaan terkait perjudian",
      },
      ...message,
    ],
    stream: true,
    max_tokens: 1000,
    temperature: 1,
    top_p: 1,
    model: modelName,
  });
  return response;
}
