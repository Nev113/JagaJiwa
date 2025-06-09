import Image from "next/image";
import botLandingImg from "@/public/assets/bot-image-landing.png";
import personLandingImg from "@/public/assets/person-landing-image.png";
import warning from "@/public/assets/warning.svg";
import LandingPageMenu from "@/components/landing-components/landingPageMenu";
import FunctionsPage from "@/components/landing-components/functionPage";
import ChatBotPage from "@/components/landing-components/ChatBotPage";
import FAQ from "@/components/landing-components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row relative">
        <div className="flex flex-row items-center justify-center w-full h-[300px]">
          <div className="relative">
            <div className="p-1 px-2 backdrop-blur-xl rounded-full ring-3 ring-gray-600 absolute font-montserrat font-semibold md:text-[14px] text-[12px] -top-[9px] -left-[20px] text-gray-300">
              100% <span className="font-lora text-green-800">Mood</span>
            </div>
            <div className="p-1 px-2 backdrop-blur-sm rounded-full ring-3 ring-gray-600 absolute font-montserrat font-semibold md:text-[14px] text-[12px] -bottom-[9px] -right-[20px] text-gray-300">
              100% <span className="font-lora text-slate-900">Privacy</span>
            </div>
            <div className="max-w-[100px] md:max-w-[140px]">
              <Image
                src={botLandingImg}
                alt="Bot Landing Image"
                className="rounded-4xl border-5 border-gray-500 inset-shadow-gray-500 inset-shadow-xl shadow-2xl shadow-gray-300/50"
                width={140}
              />
            </div>
          </div>
          <div className="md:w-[400px] w-[20%] h-1 bg-gray-200"></div>
          <div className="relative">
            <div className="p-1 px-2 backdrop-blur-xl rounded-full ring-3 ring-gray-600 absolute font-montserrat font-semibold md:text-[14px] text-[12px] -top-[9px] -left-[20px] text-gray-300">
              0% <span className="font-lora text-green-800">Mood</span>
            </div>
            <div className="p-1 px-2 backdrop-blur-sm rounded-full ring-3 ring-gray-600 absolute font-montserrat font-semibold md:text-[14px] text-[12px] -bottom-[9px] -right-[20px] text-gray-300">
              -20% <span className="font-lora text-slate-900">Finance</span>
            </div>
            <div className="max-w-[100px] md:max-w-[140px]">
              <Image
                src={personLandingImg}
                alt="Bot Landing Image"
                className="rounded-4xl border-5 border-red-500 inset-shadow-red-500 inset-shadow-xl shadow-2xl shadow-red-300/50"
                width={140}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center md:-mt-5 -mt-10 p-5">
        <h1 className="md:text-3xl text-xl font-bold text-slate-100 mb-4 text-center font-montserrat">
          Raih Kembali Harapan
          <br />
          Bersama Kita Jaga Jiwamu
        </h1>
        <div className="md:p-3 md:px-4 p-1 px-2 ring-4 ring-red-400 bg-red-200 rounded-full font-lora text-red-800 md:text-2xl text-xl font-bold flex flex-row items-center justify-center gap-2">
          <Image src={warning} alt="Warning" sizes="70" />
          Dari Kesenjangan Sosial
          <Image src={warning} alt="Warning" sizes="70" />
        </div>
      </div>
      <LandingPageMenu />
      <FunctionsPage />
      <ChatBotPage />
      <FAQ />
      <div className="my-10">
        <div className="flex flex-row gap-5 justify-center items-center">
          <h1 className="font-montserrat font-bold text-[52px] md:text-[62px]">
            JAGA
          </h1>
          <div className="flex-col flex gap-1">
            <p className="font-lora font-semibold text-[24px] md:text-[32px]">
              Jiwa
            </p>
            <p className="font-lora font-semibold text-[24px] md:text-[32px] -mt-5 text-indigo-600">
              Finansial
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
