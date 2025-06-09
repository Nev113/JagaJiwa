"use client";
export default function FAQ() {
  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.currentTarget;
    const content = target.nextElementSibling as HTMLDivElement;
    content.classList.toggle("overflow-hidden");
    content.classList.toggle("h-0");
  }
  return (
    <div className="my-5 p-5">
      <div className="flex-col flex items-center justify-center">
        <h1 className="font-montserrat font-bold text-[18px]">
          Pertanyaan <span className="font-lora">Umum</span>
        </h1>
        <p className="text-zinc-500 font-lora text-[14px] font-normal text-center">
          Pertanyaan yang sering ditanyakan di platform ini
        </p>
      </div>
      <div className="flex flex-col gap-4 *:cursor-pointer *:w-full *:p-3 *:px-4 *:ring-2 *:ring-zinc-500 *:bg-zinc-800 *:text-gray-100 *:font-montserrat *:font-semibold md:*:text-[14px] text-[12px] mt-7">
        <div
          className=" flex justify-start rounded-full z-10"
          onClick={(event) => handleClick(event)}
        >
          <p className="font-normal font-motserrat md:text-[14px] text-[12px]">
            Apa itu Jaga Jiwa dan siapa yang bisa menggunakannya?
          </p>
        </div>
        <div className="md:rounded-2xl rounded-3xl md:-mt-12 -mt-15 z-0 h-0 overflow-hidden md:mb-2 mb-5">
          <p className="font-normal font-lora md:text-[14px] text-[12px] md:pt-8 pt-10 p-2">
            Jaga Jiwa adalah aplikasi pendukung kesehatan mental gratis yang
            dirancang untuk membantu siapa saja yang berjuang dengan, atau ingin
            memahami lebih dalam tentang, risiko kecanduan judi online. Aplikasi
            ini menyediakan alat bantu, informasi, dan dukungan emosional awal
            secara anonim bagi siapa saja yang membutuhkan.
          </p>
        </div>
        <div
          className=" flex justify-start rounded-full z-10"
          onClick={handleClick}
        >
          <p className="font-normal font-motserrat md:text-[14px] text-[12px]">
            Apakah ada biaya untuk menggunakan AI Sahabat Curhat?
          </p>
        </div>
        <div className="md:rounded-2xl rounded-3xl md:-mt-12 -mt-15 z-0 h-0 overflow-hidden md:mb-2 mb-5">
          <p className="font-normal font-lora md:text-[14px] text-[12px] md:pt-8 pt-10 p-2">
            Tidak. Semua fitur utama dalam aplikasi Jagakarsa Jiwa dapat diakses
            sepenuhnya gratis. Misi kami adalah menyediakan dukungan yang mudah
            dijangkau dan dapat diakses oleh semua lapisan masyarakat yang
            membutuhkan bantuan.
          </p>
        </div>
        <div
          className=" flex justify-start rounded-full z-10"
          onClick={handleClick}
        >
          <p className="font-normal font-motserrat md:text-[14px] text-[12px]">
            Apakah privasi dan data yang saya input ke AI terjamin di sini?
          </p>
        </div>
        <div className="md:rounded-2xl rounded-3xl md:-mt-12 -mt-15 z-0 h-0 overflow-hidden md:mb-2 mb-5">
          <p className="font-normal font-lora md:text-[14px] text-[12px] md:pt-8 pt-10 p-2">
            Ya, privasi Anda adalah prioritas utama kami. Aplikasi ini tidak
            memerlukan informasi identitas pribadi seperti nama asli, email,
            atau nomor telepon. Fitur sensitif seperti &quot;Jurnal Suasana
            Hati&quot; dirancang untuk menyimpan data secara lokal di perangkat
            Anda, bukan di server kami, demi menjamin kerahasiaan maksimal.
          </p>
        </div>
      </div>
    </div>
  );
}
