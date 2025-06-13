import Image from "next/image";
import BotLogo from "@/public/assets/FunctionBot.svg";
import PointLogo from "@/public/assets/FunctionPoint.svg";
import SearchLogo from "@/public/assets/searchlogo.svg";

export default function FunctionsPage() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full  my-0 mt-[100px] p-5 pt-0">
      <div className="text-center">
        <h1 className="text-[18px] font-bold font-montserrat">
          Fitur{" "}
          <span className="font-lora font-bold text-blue-400">
            Unggulan Kami
          </span>
        </h1>
        <p className="font-lora text-[14px] font-normal">
          Berikut adalah fitur-fitur utama yang kami rancang untuk platform ini
        </p>
      </div>
      <div className="grid md:grid-cols-2 justify-center items-center gap-5 *:w-full *:h-full *:rounded-3xl *:ring-4 *:ring-zinc-500 *:bg-zinc-800 *:p-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="md:max-w-[50px] max-w-[40px]">
            <Image src={BotLogo} alt="Function Bot" width={50} height={50} />
          </div>
          <h1 className="font-montserrat font-semibold md:text-[14px] text-[12px]">
            Sahabat Curhat AI
          </h1>
          <p className="font-lora md:text-[12px] font-normal md:text-center text-[10px]">
            Dapatkan dukungan emosional awal, jawaban atas pertanyaan Anda
            seputar judi online dan kesehatan mental, serta arahan yang tepat
            melalui chatbot AI kami yang siap mendengarkan Anda secara anonim
            dan tanpa menghakimi.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="md:max-w-[50px] max-w-[40px] p-2 bg-zinc-700 rounded-sm">
            <Image src={SearchLogo} alt="Function Bot" width={20} />
          </div>
          <h1 className="font-montserrat font-semibold md:text-[14px] text-[12px]">
            Ekstensi Deteksi Dini
          </h1>
          <p className="font-lora md:text-[12px] text-[10px] font-normal md:text-center">
            Ektensi yang dibuat untuk membantu Anda mendeteksi keyword atau
            website yang anda input ke Browser anda ditenagai oleh AI yang akan
            memberikan peringatan untuk anda.
          </p>
        </div>
      </div>
    </div>
  );
}
