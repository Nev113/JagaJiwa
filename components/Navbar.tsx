import Image from "next/image";
import logoJagaJiwa from "@/public/assets/logo-jagajiwa.png";
import botLogo from "@/public/assets/bot.svg";

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between p-2 flex-row mb-10">
        <Image src={logoJagaJiwa} alt="Logo Jaga Jiwa" width={100} />
        <div className="p-2 ring-4 ring-zinc-700 px-3 rounded-full font-montserrat font-bold text-[16px] hover:ring-zinc-500 backdrop-blur-md bg-zinc-800 flex flex-row items-center gap-2 hpber:bg-zinc-700 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-gray-600/50">
          <Image src={botLogo} alt="Logo JagaAI" width={30} />
          Chats
        </div>
      </nav>
    </div>
  );
}
