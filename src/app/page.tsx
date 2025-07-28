"use client";
import Image from "next/image";
import { Sacramento, Open_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import GuestTable from "@/components/guestTable";
import { motion, useAnimationControls } from "framer-motion";

const greatVibesFont = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--great-vibes",
  display: "swap",
});

const openSansFont = Open_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--open-sans",
  display: "swap",
});

const timeTable = [
  { time: "17h", event: "Okupljanje", location: "restoran Poljud" },
  { time: "19h", event: "Vjenčanje", location: "crkva sv. Ante" },
  { time: "20:30", event: "Svečana večera", location: "restoran Poljud" },
];

export default function Home() {
  const topControls = useAnimationControls();
  const botControls = useAnimationControls();
  const pozadinaControls = useAnimationControls();
  const inviteControls = useAnimationControls();
  const [hasStarted, setHasStarted] = useState(true);
  const [openNow, setOpenNow] = useState(false);
  const [animationStarted, setanimationStarted] = useState(false);

  function playOpeningAnimation() {
    if (animationStarted) return;
    setanimationStarted(true);
    document.body.scrollTop = 0;
    setHasStarted(false);
    pozadinaControls.start({
      y: ["-120px", "-200px", "-250px"],
      transition: { duration: 1.5, ease: "easeInOut" },
    });
    topControls
      .start({
        rotateX: 180,
        y: ["0px", "10px", "20px", "30px", "60px", "100px"],
        transition: { duration: 1, ease: "easeInOut" },
        transitionEnd: { position: "relative", zIndex: 0 },
      })
      .then(() => {
        pozadinaControls.start({
          y: ["-250px", "1200px"],
          transition: { duration: 2, ease: "easeInOut" },
        });
        topControls.start({
          y: ["100px", "1200px"],
          transition: { duration: 2, ease: "easeInOut" },
        });
        botControls
          .start({
            y: ["0px", "200px", "1200px"],
            transition: { duration: 2, ease: "easeInOut" },
          })
          .then(() => {
            botControls.start({ display: "none" });
            topControls.start({ display: "none" });
            pozadinaControls.start({ display: "none" });
            document.body.style.overflowY = "auto";
          });
        inviteControls.start({
          scale: [0.8, 0.85, 0.9, 0.92, 1],
          transition: { duration: 2 },
        });
      });
  }

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = "hidden";
    inviteControls.start({ scale: [0.8] });
    topControls.start({
      rotateX: [5, 20, 5, 20, 5, 20, 5],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
    });
    setTimeout(() => {
      setOpenNow(true);
    }, 1500);
  }, []);

  useEffect(() => {
    if (openNow) {
      playOpeningAnimation();
    }
  }, [openNow]);

  return (
    <main
      className={`${greatVibesFont.className} ${greatVibesFont.variable} ${openSansFont.className} bg-#f8f8f8 w-screen min-h-screen `}
    >
      {/* ✉️ Kuverta */}
      <div
        style={{
          minWidth: "370px",
          maxWidth: "600px",
          background: "white",
          position: "relative",
          margin: "auto",
        }}
        onClick={() => {
          setOpenNow(true);
        }}
      >
        <motion.div animate={topControls} className="z-20 relative">
          <div className="absolute top-0 left-0 w-full ">
            <img
              src="/images/vrh.svg"
              alt="envelope"
              className="w-full scale-95"
            />
          </div>
        </motion.div>

        <motion.div animate={botControls} className="z-30 relative">
          <div className="absolute top-0 left-0 w-full ">
            <img
              src="/images/dno.svg"
              alt="envelope"
              className="w-full  scale-95"
            />
          </div>
        </motion.div>

        <motion.div animate={pozadinaControls} className="z-0 relative">
          <div className="absolute top-[-50px] left-0 w-full ">
            <img
              src="/images/pozadina.svg"
              alt="envelope"
              className="w-full  scale-95"
            />
          </div>
        </motion.div>
      </div>

      {/* 📜 Sama pozivnica */}
      <motion.div
        animate={inviteControls}
        className={`${hasStarted ? "scale-90" : ""}`}
      >
        <div
          className="flex flex-col mx-auto shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] shadow-slate-400 relative"
          style={{
            minWidth: "400px",
            maxWidth: "600px",
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* 📸 Slika pozivnice */}
          <img
            src="/images/pozivnica2.png"
            alt="pozivnica"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />

          {/* 👇 GuestTable unutar boxa, ispod slike */}
          <div
            className="p-6 pt-20"
            style={{ backgroundColor: "#f8f8f8", marginTop: "-10px" }}
          >
            <GuestTable timeTable={timeTable} />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
