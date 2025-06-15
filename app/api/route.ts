import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    const endpoint = `https://${process.env.AZURE_RESOURCE_NAME}.cognitiveservices.azure.com/language/:analyze-text?api-version=2022-05-01`;
    const apiKey = process.env.AZURE_API_KEY;

    const response = await axios.post(
      endpoint,
      {
        kind: "SentimentAnalysis",
        parameters: { opinionMining: true },
        analysisInput: { documents: [{ id: "1", language: "id", text }] },
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const sentiment = response.data.results.documents[0];

    const sentimentScore = sentiment.sentiment;
    const confidence = sentiment.confidenceScores;

    const stressResponses = [
      "Tenang, semuanya akan baik-baik saja. Ambil napas dalam-dalam.",
      "Kamu sudah melakukan yang terbaik. Istirahat sejenak ya.",
      "Jangan terlalu keras pada diri sendiri. Kamu hebat!",
      "Setiap masalah pasti ada solusinya. Tetap semangat!",
      "Ingat, stres adalah hal normal. Yang penting adalah bagaimana kita menghadapinya.",
      "Coba luangkan waktu untuk hal yang kamu sukai hari ini.",
      "Kamu tidak sendirian dalam menghadapi ini semua.",
    ];

    let message = "";
    let isStressed = false;

    if (sentimentScore === "negative" && confidence.negative > 0.7) {
      isStressed = true;
      message =
        stressResponses[Math.floor(Math.random() * stressResponses.length)];
    } else if (sentimentScore === "positive") {
      message =
        "Senang melihat kamu dalam mood yang baik! Tetap jaga semangat ya!";
    }

    return NextResponse.json({
      sentiment: sentimentScore,
      confidence: confidence,
      isStressed: isStressed,
      message: message,
      supportMessage: isStressed
        ? "Jika kamu merasa overwhelmed, jangan ragu untuk mencari bantuan profesional."
        : null,
    });
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return NextResponse.json(
      { error: "Gagal menganalisis sentimen" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method GET tidak didukung" },
    { status: 405 }
  );
}
