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
      {
        role: "assistant",
        content:
          'Tentu! Berikut ini adalah contoh kode Python untuk mencetak "Hello, World!":\n\n```python\nprint("Hello, World!")\n```',
      },
    ],
    max_tokens: 800,
    temperature: 0.7,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: null,
  });

  console.log(JSON.stringify(result, null, 2));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });
  return NextResponse.json({ message: "Hello World" });
}
