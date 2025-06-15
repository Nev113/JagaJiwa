import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question } = await req.json();
  const endpoint = `https://jagajiwaqna.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=JagaJiwa&api-version=2021-10-01&deploymentName=production`;
  const apiKey = process.env.AZURE_API_KEY;
  try {
    const response = await axios.post(
      endpoint,
      {
        top: 3,
        question,
        includeUnstructuredSources: true,
        confidenceScoreThreshold: 0.5,
        answerSpanRequest: {
          enable: true,
          topAnswersWithSpan: 1,
          confidenceScoreThreshold: 0.5,
        },
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );
    const answer =
      response.data.answers[0]?.answer || "Maaf, saya tidak tahu jawabannya.";
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error fetching QnA response:", error);
    return NextResponse.json(
      { error: "Gagal mendapatkan jawaban" },
      { status: 500 }
    );
  }
}
