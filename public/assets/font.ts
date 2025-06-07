import localFont from "next/font/local";

export const montserrat = localFont({
  src: [
    {
      path: "../fonts/montserrat/Montserrat-Bold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/montserrat/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-montserrat",
});

export const lora = localFont({
  src: [
    {
      path: "../fonts/lora/Lora-SemiBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/lora/Lora-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-lora",
});
