import MovingCards from "@/components/shared/moving-card";
import { LeadersDetails } from "@/constants/leaders/leaders";
import Link from "next/link";
import React from "react";

const LeadersMobile = () => {
  return (
    <MovingCards
      pauseOnHover
      className="w-full flex items-center justify-center [--duration:30s] -mt-14 pb-7 md:hidden"
    >
      {LeadersDetails.map((leader, index) => (
        <div
          key={index}
          className="w-[300px] h-[420px] lg:h-[400px] border border-green/30 flex flex-col items-start justify-start rounded-lg bg-white shadow-md"
        >
          <div className="w-full h-[60%] object-contain border-b border-green/40">
            <img
              src={leader.image}
              alt={leader.name}
              className="w-full h-full rounded-t-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 items-start px-3 pt-2">
            <h1 className="text-sm font-semibold text-green">{leader.name}</h1>
            <p className="text-[14px] text-green min-h-[60px]">{leader.role}</p>
            <div className="flex items-center gap-4 mt-2">
              {leader.instagram && (
                <Link href={leader.instagram}>
                  <img
                    src="/social-icons/instagram.svg"
                    alt="instagram"
                    className="size-4 shrink-0"
                  />
                </Link>
              )}
              {leader.linkedin && (
                <Link href={leader.linkedin}>
                  <img
                    src="/social-icons/linkedin.svg"
                    alt="linkedin"
                    className="size-4 shrink-0"
                  />
                </Link>
              )}
              {leader.facebook && (
                <Link href={leader.facebook}>
                  <img
                    src="/social-icons/facebook.svg"
                    alt="facebook"
                    className="size-4 shrink-0"
                  />
                </Link>
              )}
              {leader.x && (
                <Link href={leader.x}>
                  <img
                    src="/social-icons/x.svg"
                    alt="x"
                    className="size-4 shrink-0"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </MovingCards>
  );
};

export default LeadersMobile;
