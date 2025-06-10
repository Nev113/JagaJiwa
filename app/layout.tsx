import type { Metadata } from "next";
import "../styles/globals.css";
import { lora, montserrat } from "@/public/assets/font";
import Navbar from "@/components/Navbar";
import favicon from "@/public/assets/favicon.ico";
export const metadata: Metadata = {
  title: "Jaga Jiwa",
  description:
    "Jaga Jiwa adalah platform yang membantu menjaga kesehatan mental dengan bantuan chat 24/7 AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="dicoding:email" content="nevosangkane446@gmail.com"></meta>
      </head>
      <body
        className={`${lora.variable} ${montserrat.variable} mx-auto max-w-2xl antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
