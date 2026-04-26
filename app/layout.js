import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Fraunces } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Reveal from "./components/helper/reveal";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SmoothScroll from "./components/providers/smooth-scroll";
import Cursor from "./components/effects/cursor";
import Preloader from "./components/effects/preloader";
import ScrollProgress from "./components/effects/scroll-progress";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata = {
  title: "Hardik Saini — CS @ GSU · Mercedes-Benz USA · ARCTIC HPC",
  description:
    "Hardik Saini is a CS junior at Georgia State, ARCTIC HPC team member, and Mercedes-Benz USA intern. I build practical AI, cloud, and enterprise tools.",
  metadataBase: new URL("https://hardiksaini.com"),
  openGraph: {
    title: "Hardik Saini — Builder",
    description:
      "Practical AI, cloud, and enterprise tools that turn messy workflows into usable systems.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className={inter.className}>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <ScrollProgress />
        <ToastContainer position="bottom-right" theme="light" />
        <Reveal />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--ink)] focus:text-[var(--paper)] focus:rounded-full"
        >
          Skip to content
        </a>
        <Navbar />
        <main
          id="main-content"
          className="relative mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12"
        >
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
