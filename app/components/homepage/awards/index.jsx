// @flow strict

import { awards } from "@/utils/data/awards";
import Image from "next/image";
import Link from "next/link";
import lottieFile from "../../../assets/lottie/development.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Awards() {
  return (
    <div id="awards" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Section"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Awards & Recognition
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-3/4 h-3/4">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {awards.map((award) => (
                <GlowCard key={award.id} identifier={`award-${award.id}`}>
                  <div className="p-3 relative text-white">
                    <Image
                      src="/blur-23.svg"
                      alt="Glow"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {award.date}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-5">
                      <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                        {award.title}
                      </p>
                      <p className="text-sm sm:text-base text-[#cdd5f7]">
                        {award.issuer}
                      </p>
                      <p className="text-sm sm:text-base text-gray-200">
                        {award.description}
                      </p>
                      {award.link && (
                        <Link
                          className="text-sm text-[#16f2b3] underline underline-offset-4 hover:text-pink-400 transition-colors"
                          href={award.link}
                          target="_blank"
                        >
                          View credential
                        </Link>
                      )}
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
