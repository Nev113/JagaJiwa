import learnModule from "@/public/assets/learn-module.svg";
import sahabatCurhat from "@/public/assets/sahabat-curhat.svg";
import community from "@/public/assets/community.svg";
import Image from "next/image";

export default function LandingPageMenu() {
  return (
    <div className="hidden my-10 md:flex flex-row items-center justify-center md:gap-8 gap-4 md:p-4 p-2 *:cursor-pointer md:*:h-[150px] *:h-[100px]">
      <div className="bg-[url(../public/assets/mesh-grad.png)] hover:p-2  rounded-3xl ring-6 ring-gray-600 w-1/3 transition-all duration-300 ease-in-out ">
        <div className="w-full h-full bg-zinc-800 rounded-3xl p-5 flex flex-col gap-2 justify-between">
          <div className="flex flex-row gap-2 font-bold text-[18px] font-montserrat">
            <div className="max-w-[20px] md:max-w-[25px]">
              <Image src={learnModule} alt="Learning Module" width={25} />{" "}
            </div>
            <span className="hidden md:block">Learn</span>
          </div>
          <div className="font-lora font-semibold md:text-[18px] text-[14px]">
            Coming Soon
          </div>
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
