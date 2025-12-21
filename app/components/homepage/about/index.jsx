// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";


function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl">
            About Me
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">
            {personalData.description}
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <div className="group relative">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[28px] bg-[conic-gradient(from_120deg,rgba(168,85,247,0.4),rgba(236,72,153,0.35),rgba(34,211,238,0.35),rgba(168,85,247,0.4))] opacity-60 blur-2xl transition duration-500 group-hover:scale-105 group-hover:opacity-80 group-hover:blur-[42px]"
              aria-hidden="true"
            ></div>
            <div className="relative rounded-[22px] bg-[#0b0f24] p-1.5 shadow-[0_0_30px_rgba(168,85,247,0.35)] transition duration-500 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.45)]">
              <Image
                src={personalData.profile}
                width={272}
                height={272}
                alt="Hardik Saini"
                className="rounded-[18px] transition-all duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;