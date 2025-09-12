"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Типизация
type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  hoverText: string;
};

interface TeamSectionProps {
  team: TeamMember[];
}

// Определяем, мобильное ли устройство
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
};

export const HostsSection = ({ team }: TeamSectionProps) => {
  const isMobile = useIsMobile();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    setExpandedIndex(0);
  }, [isMobile]);

  return (
    <section id="hosts" className="py-20 px-4 bg-porch-black">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-porch-creamy text-center mb-16"
        >
          Meet The Team
        </motion.h2>

        {isMobile ? (
          <div className="flex flex-col w-full gap-4">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="rounded-xl overflow-hidden border-2 border-porch-border"
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                <div className="relative w-full h-24 flex items-center p-4 bg-porch-border cursor-pointer">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-porch-creamy">
                      {member.name}
                    </h3>
                    <p className="text-porch-green-light font-semibold">
                      {member.role}
                    </p>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-porch-black p-4"
                    >
                      <p className="text-porch-creamy italic text-sm mb-3">
                        &quot;{member.hoverText}&quot;
                      </p>
                      <p className="text-porch-grey text-sm">{member.bio}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-stretch w-full gap-4 min-h-[500px]">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className={`relative rounded-xl overflow-hidden cursor-pointer border-2 ${
                  expandedIndex === index
                    ? "border-porch-green-light"
                    : "border-transparent"
                }`}
                animate={{
                  width:
                    expandedIndex === index
                      ? "clamp(300px, 50%, 600px)"
                      : "clamp(100px, 12%, 180px)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={() => setExpandedIndex(index)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-porch-black via-porch-black/80 to-transparent" />

                  <div className="absolute inset-0 p-6 w-full text-porch-creamy overflow-hidden">
                    <AnimatePresence mode="wait">
                      {expandedIndex === index ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4 }}
                          className="absolute bottom-6 left-6 right-6"
                        >
                          <h3 className="text-2xl font-bold whitespace-nowrap">
                            {member.name}
                          </h3>
                          <p className="text-porch-green-light font-semibold">
                            {member.role}
                          </p>
                          <div className="mt-4">
                            <p className="text-porch-creamy italic text-sm mb-3">
                              &quot;{member.hoverText}&quot;
                            </p>
                            <p className="text-porch-grey text-sm">
                              {member.bio}
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-6 left-0 right-0 px-2 text-center"
                        >
                          {(() => {
                            const [firstName, ...lastName] =
                              member.name.split(" ");
                            return (
                              <div className="flex flex-col items-center">
                                <h3 className="text-md font-bold leading-tight">
                                  {firstName}
                                </h3>
                                <h3 className="text-md font-bold leading-tight">
                                  {lastName.join(" ")}
                                </h3>
                                <p className="text-porch-green-light text-[14px] font-semibold mt-1">
                                  {member.role}
                                </p>
                              </div>
                            );
                          })()}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
