"use client";
import Image from "next/image";
import logoJagaJiwa from "@/public/assets/logo-jagajiwa.png";
import botLogo from "@/public/assets/bot.svg";

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between p-5 md:p-2 flex-row mb-10">
        <div
          className="max-w-[70px] md:max-w-[100px] cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <Image src={logoJagaJiwa} alt="Logo Jaga Jiwa" width={100} />
        </div>
        <div
          onClick={() => (window.location.href = "/chats")}
          className="p-2 text-[12px] md:text-[16px] ring-2 md:ring-4 ring-zinc-700 px-3 rounded-full font-montserrat font-bold hover:ring-zinc-500 backdrop-blur-md bg-zinc-800 flex flex-row items-center gap-2 hpber:bg-zinc-700 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-gray-600/50"
        >
          <div className="max-w-[24px] md:max-w-[30px]">
            <Image src={botLogo} alt="Logo JagaAI" width={30} />
          </div>
          Chats
        </div>
      </nav>
    </div>
  );
}
