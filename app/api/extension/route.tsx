import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { promptText } = await req.json();
    console.log("Received promptText:", promptText);

    if (!promptText) {
      return NextResponse.json(
        { error: "promptText is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBl6gxH13rMfc2YBkCOsi_PlYbQq7wRAb4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: promptText,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI API error ${response.status}: ${errorText}`);
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: response.status }
      );
    }
    const data = await response.json();
    console.log(`📊 AI Response data:`, data);

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!content) {
      console.error("Tidak ada content dalam response");
      return NextResponse.json(
        { error: "No content in AI response" },
        { status: 500 }
      );
    }

    console.log(`AI Response content: "${content}"`);

    return NextResponse.json({
      success: true,
      content: content,
      rawData: data,
    });
  } catch (error) {
    console.error("Error in AI API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
