import logo from "@/public/assets/logo-jagajiwa.png";
import { Span } from "next/dist/trace";
import Image from "next/image";
export default function Footer() {
  return (
    <div className="my-5 rounded-3xl ring-4 ring-zinc-600 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <Image src={logo} alt="Logo Jaga Jiwa" width={50} />{" "}
          <h1 className="font-montserrat font-bold text-[18px]">
            Jaga<span className="font-lora font-medium">Jiwa</span>
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex-row gap-2 flex">
            <p className="font-montserrat text-[14px]">
              <span className="font-lora">Email : </span>nv@nv113.me
            </p>
          </div>
          <span className="font-montserrat font-regular text-zinc-500 text-[14px]">
            © 2025 JagaJiwa. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}
