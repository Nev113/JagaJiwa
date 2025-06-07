import learnModule from "@/public/assets/learn-module.svg";
import sahabatCurhat from "@/public/assets/sahabat-curhat.svg";
import community from "@/public/assets/community.svg";
import Image from "next/image";

export default function LandingPageMenu() {
  return (
    <div className="my-10 flex flex-row items-center justify-center gap-8 p-4 *:cursor-pointer *:h-[150px]">
      <div className="bg-[url(../public/assets/mesh-grad.png)] hover:p-2  rounded-3xl ring-6 ring-gray-600 w-1/3 transition-all duration-300 ease-in-out ">
        <div className="w-full h-full bg-zinc-800 rounded-3xl p-5 flex flex-col justify-between">
          <div className="flex flex-row gap-2 font-bold text-[18px] font-montserrat">
            <Image src={learnModule} alt="Learning Module" width={25} /> Learn
          </div>
          <div className="font-lora font-semibold text-[18px]">Coming Soon</div>
        </div>
      </div>
      <div className="bg-[url(../public/assets/mesh-grad.png)] hover:p-2 rounded-3xl ring-6 ring-gray-600 w-1/3 transition-all duration-300 ease-in-out">
        <div className="w-full h-full bg-zinc-800 rounded-3xl p-5 flex flex-col justify-between">
          <div className="flex flex-row gap-2 font-bold text-[18px] font-montserrat">
            <Image src={sahabatCurhat} alt="Chats AI" width={25} /> Chats
          </div>
          <div className="font-lora font-semibold text-[18px]">
            Sahabat Curhat AI
          </div>
        </div>
      </div>
      <div className="bg-[url(../public/assets/mesh-grad-2.png)] hover:p-2 rounded-3xl ring-6 ring-gray-600 w-1/3 transition-all duration-300 ease-in-out">
        <div className="w-full h-full bg-zinc-800 rounded-3xl p-5 flex flex-col justify-between">
          <div className="flex flex-row gap-2 font-bold text-[18px] font-montserrat">
            <Image src={community} alt="Community" width={25} /> Community
          </div>
          <div className="font-lora font-semibold text-[18px]">Coming Soon</div>
        </div>
      </div>
    </div>
  );
}
