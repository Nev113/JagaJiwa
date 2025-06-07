import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

export async function main() {
  const endpoint =
    process.env["AZURE_OPENAI_ENDPOINT"] ||
    "https://jagajiwaai-resource.cognitiveservices.azure.com/";
  const apiKey = process.env["AZURE_OPENAI_API_KEY"];
  const apiVersion = "2025-01-01-preview";
  const deployment = "JagaJiwaAI-SahabatCurhat";

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

  const result = await client.chat.completions.create({
    messages: [
      { role: "user", content: "berikan aku kode python hello world" },
    ],
    max_tokens: 800,
    temperature: 0.7,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: null,
  });
  console.log("Response:", result);
  return result.choices[0].message.content;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });
  const result = await main();
  console.log("Result:", result);
  return NextResponse.json({ result });
}
