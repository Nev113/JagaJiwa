import Image from "next/image";
import moduleExtension from "@/public/assets/modelExtension.png";
import chromeWebStore from "@/public/assets/Chrome Web Store Logo.png";
import edgeAddOns from "@/public/assets/AddOnsEdge.png";
export default function ExtensionPath() {
  return (
    <div className="flex flex-col md:flex-row gap-5 justify-center items-center my-10">
      <div className="md:w-1/2 w-full justify-center items-center flex p-5 md:p-0">
        <Image src={moduleExtension} width={300} alt="Extension Image" />
      </div>
      <div className="md:w-1/2 w-full flex p-5 md:p-0 flex-col gap-1 justify-center md:justify-start md:items-start items-center -mt-5 md:mt-0">
        <div className="w-fit font-lora font-semibold p-1 px-2 text-[13px] ring-2 bg-zinc-700 ring-zinc-200 rounded-full">
          Ekstensi
        </div>
        <div className="mt-2 font-montserrat font-bold text-[18px] text-slate-200">
          JagaJiwa : Deteksi Lebih Awal
        </div>
        <p className="font-lora text-slate-300 text-[12px] text-center md:text-left">
          Ekstensi yang berjalan di Chrome dan Edge Browser dengan bantuan AI
          untuk hasil yang lebih tepat.
        </p>
        <p className="md:hidden font-montserrat text-gray-500 text-center text-[12px] mt-2">
          Untuk Browser Smartphone saat ini tidak dapat mensupport ekstensi ini
        </p>
        <div className="mt-2 md:block hidden">
          <p className="font-montserrat text-[10px]">
            Dapatkan Ekstensi ini di Store Web Browser Anda
          </p>
          <div className="flex flex-row gap-2 mt-2 *:p-2 *:px-3 *:rounded-full *:w-fit *:bg-gray-50 font-semibold text-slate-800 *:text-[12px] *:cursor-pointer">
            <div className="flex flex-row items-center gap-1">
              {" "}
              <Image alt="ChromeWebStore" src={chromeWebStore} width={30} />
              Chrome Web Store
            </div>
            <div className="flex flex-row items-center gap-1">
              {" "}
              <Image alt="ChromeWebStore" src={edgeAddOns} width={30} />
              Microsoft Edge Add-ons
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
