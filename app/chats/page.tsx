"use client";
import LogoBot from "@/public/assets/bot.svg";
import Image from "next/image";
import sendBtn from "@/public/assets/sendBtn.svg";
import { useState, useRef } from "react";

export default function ChatBotPage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { content: string; role: "user" | "assistant" }[]
  >([{ role: "assistant", content: "Ada Yang Bisa Saya Bantu?" }]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerChatref = useRef<HTMLDivElement>(null);
  const handleSendMessage = async (text?: string) => {
    const userMessage = text || input;

    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    headerChatref.current?.style.setProperty("display", "none");

    try {
      let sentimentText = "";
      try {
        const sentimentResponse = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: userMessage,
          }),
        });

        if (sentimentResponse.ok) {
          const sentimentData = await sentimentResponse.json();
          sentimentText = sentimentData.message || "";
        }
      } catch (sentimentError) {
        console.error("Error getting sentiment:", sentimentError);
      }

      const response = await fetch("/api/qna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mendapatkan jawaban");
      }

      const data = await response.json();
      const qnaResponse =
        data.answer || "Maaf, saya tidak dapat memahami pertanyaan Anda.";

      const assistantResponse = sentimentText
        ? `${sentimentText} ${qnaResponse}`
        : qnaResponse;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, terjadi kesalahan saat memproses pesan Anda.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    handleSendMessage(example);
  };

  return (
    <div className="p-2 mb-3 overflow-hidden">
      <div className="rounded-3xl w-full backdrop-blur-2xl min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-160px)]">
        <div className="text-center mb-5" ref={headerChatref}>
          <h1 className="font-lora font-normal text-[18px]">
            Mulai Dengan{" "}
            <span className="font-montserrat font-semibold">Sahabat</span>
            <span className="font-lora font-normal">Curhat</span>
          </h1>
          <p className="font-montserrat font-normal text-gray-500 text-[14px] mt-2">
            Berikan keluhan mengenai kecanduan judi online yang Anda alami /
            lakukan survey resiko kecanduan judi online Anda
          </p>
        </div>{" "}
        <div
          className="mb-3 overflow-y-auto max-h-[65vh] md:max-h-[55vh] pr-2 flex flex-col gap-3 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-thumb]:bg-indigo-400
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-track]:bg-zinc-800
  [&::-webkit-scrollbar-track]:rounded-full
  "
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 p-3 ${
                message.role === "assistant"
                  ? "w-fit px-5"
                  : "w-fit bg-zinc-700 rounded-2xl px-5 self-end"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex flex-row gap-2">
                  <Image src={LogoBot} alt="Chat Bot" width={20} height={20} />
                  <span className="font-lora font-semibold text-[14px]">
                    Sahabat{" "}
                    <span className="font-montserrat font-bold text-[14px]">
                      Curhat
                    </span>
                  </span>
                </div>
              )}
              <p className="font-montserrat font-normal text-[12px]">
                {message.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex flex-col fixed bottom-0 w-full">
          {" "}
          <div className="rounded-2xl hidden md:flex flex-row gap-3 rounded-b-none w-fit bg-zinc-100 p-3 *:rounded-3xl *:cursor-pointer *:h-fit *:ring-2 *:bg-zinc-300 *:p-1 *:px-4 *:ring-zinc-700 *:text-zinc-600 *:font-semibold *:text-[12px] h-[65px]">
            <div
              className="font-lora"
              onClick={() =>
                handleExampleClick(
                  "Berikan Aku Tips Anti Kecanduan Akan Judi ?"
                )
              }
            >
              Berikan Aku Tips Anti Kecanduan Akan Judi ?
            </div>
            <div
              className="font-lora"
              onClick={() =>
                handleExampleClick("Apakah Saya Kecanduan Judi Online ?")
              }
            >
              Apakah Saya Kecanduan Judi Online ?
            </div>
          </div>
          <div className="bg-zinc-100 w-full rounded-full p-3 -mt-6 flex items-center justify-center z-1 h-[55px]">
            <div className="w-full bg-zinc-800 rounded-full z-[100] flex flex-row ring-3 ring-zinc-800 gap-3">
              <input
                type="text"
                className="w-full px-4 bg-transparent text-gray-100 flex items-center text-[14px] placeholder:text-gray-400 focus:outline-none"
                placeholder="Ketik pertanyaan anda disini..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <button
                className="p-2 px-5 cursor-pointer font-montserrat font-bold text-zinc-800 text-[14px] rounded-full bg-zinc-100 flex flex-row gap-1"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
              >
                <Image src={sendBtn} alt="sendBtn" width={25} />
                {isLoading ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
