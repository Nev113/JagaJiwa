import Image from "next/image";
import BotLogo from "@/public/assets/FunctionBot.svg";
import PointLogo from "@/public/assets/FunctionPoint.svg";

export default function FunctionsPage() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full my-5">
      <div className="text-center">
        <h1 className="text-[18px] font-bold font-montserrat">
          Fitur Unggulan Kami
        </h1>
        <p className="font-lora test-[14px] font-normal">
          Berikut adalah fitur-fitur utama yang kami rancang untuk platform ini
        </p>
      </div>
      <div className="flex flex-row gap-5 *:w-[50%] *:rounded-3xl *:ring-4 *:ring-zinc-500 *:bg-zinc-800 *:p-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <div>
            <Image src={BotLogo} alt="Function Bot" width={50} height={50} />
          </div>
          <h1 className="font-montserrat font-semibold text-[14px]">
            Sahabat Curhat AI
          </h1>
          <p className="font-lora text-[12px] font-normal text-center">
            Dapatkan dukungan emosional awal, jawaban atas pertanyaan Anda
            seputar judi online dan kesehatan mental, serta arahan yang tepat
            melalui chatbot AI kami yang siap mendengarkan Anda secara anonim
            dan tanpa menghakimi.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div>
            <Image src={PointLogo} alt="Function Bot" width={50} height={50} />
          </div>
          <h1 className="font-montserrat font-semibold text-[14px]">
            Asesmen Risiko Dini
          </h1>
          <p className="font-lora text-[12px] font-normal text-center">
            Pahami potensi risiko Anda terhadap kecanduan judi online melalui
            serangkaian pertanyaan sederhana. Hasil asesmen bersifat pribadi,
            rahasia, dan membantu Anda mengambil langkah pencegahan lebih awal.
          </p>
        </div>
      </div>
    </div>
  );
}
