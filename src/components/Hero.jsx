import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import mkceImage from "../image/MKCEAerialView.jpg";
import brochurePdf from "../image/broucher.pdf";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target date: February 20, 2026, 09:00:00 in Kolkata timezone (IST - UTC+5:30)
      const targetDate = new Date("2026-02-20T09:00:00+05:30");
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Different layers move at different speeds (parallax depth)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const statsY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats = [
    { value: "36", label: "Hours" },
    { value: "₹1L+", label: "Prizes" },
    { value: "5", label: "Domains" },
  ];

  // Google Form embed URL
  const formUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfx5y8ipMxMeMXmI_hGmv1NmFDeql8JKpo4MXdoeeWyXqYdMA/viewform?embedded=true";

  return (
    <>
      <section
        ref={ref}
        id="home"
        className="relative min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden py-16 md:py-12"
      >
        {/* Background Image - Slowest Layer (Parallax) */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${mkceImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%) brightness(0.3)",
            y: backgroundY,
          }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 z-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        />

        {/* Content - Moves faster (Parallax) */}
        <motion.div
          className="relative z-10 px-6 max-w-4xl mx-auto"
          style={{ y: textY, opacity }}
        >
          {/* Badge - Fastest Layer */}
          {/* Badge moved below stats */}

          {/* Title */}
          <motion.h1
            className="mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif" }}
          >
            <span
              className="block font-extrabold tracking-tight text-white"
              style={{
                fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif",
                letterSpacing: "0.05em",
                fontSize: "clamp(3.5rem, 12vw, 6rem)",
              }}
            >
              HACKFEST
            </span>
            <span
              className="block font-extrabold tracking-tight text-gray-400 mt-1"
              style={{
                fontFamily: "'Bebas Neue', 'Space Grotesk', sans-serif",
                letterSpacing: "0.08em",
                fontSize: "clamp(2.5rem, 9vw, 4rem)",
              }}
            >
              2K26
            </span>
          </motion.h1>

          {/* Location & Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-sm md:text-base text-gray-400 mb-1">
              M. Kumarasamy College of Engineering, Karur
            </p>
            <p className="text-base md:text-lg font-semibold text-white">
              February 20 - 21, 2026
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            style={{ y: statsY }}
            className="flex justify-center gap-8 md:gap-12 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <span
                  className="block text-2xl md:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* 36-HOUR HACKATHON Badge (moved below stats) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="mb-2"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm md:text-base font-extrabold text-white"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                letterSpacing: "0.08em",
                boxShadow: "0 0 20px rgba(255,255,255,0.05)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              36-HOUR HACKATHON
            </span>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            style={{ y: statsY }}
            className="mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div
              className="inline-block px-3 py-2 rounded-lg relative"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Left Robot - Peeking from left edge */}
              <motion.div
                className="absolute -left-10 top-1/2 -translate-y-1/2 hidden sm:block"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.svg
                  width="40"
                  height="50"
                  viewBox="0 0 40 50"
                  animate={{
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Antenna */}
                  <circle cx="20" cy="4" r="3" fill="#C9A227" />
                  <line
                    x1="20"
                    y1="7"
                    x2="20"
                    y2="12"
                    stroke="#666"
                    strokeWidth="2"
                  />
                  {/* Head */}
                  <rect
                    x="8"
                    y="12"
                    width="24"
                    height="20"
                    rx="4"
                    fill="#2D2D2D"
                    stroke="#444"
                    strokeWidth="2"
                  />
                  {/* Eyes - Looking Right at timer */}
                  <circle cx="15" cy="22" r="4" fill="#1a1a1a" />
                  <circle cx="25" cy="22" r="4" fill="#1a1a1a" />
                  <motion.circle
                    cx="17"
                    cy="22"
                    r="2"
                    fill="#C9A227"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="27"
                    cy="22"
                    r="2"
                    fill="#C9A227"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  {/* Happy mouth */}
                  <path
                    d="M 14 28 Q 20 32 26 28"
                    fill="none"
                    stroke="#C9A227"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Body */}
                  <rect
                    x="12"
                    y="34"
                    width="16"
                    height="10"
                    rx="2"
                    fill="#2D2D2D"
                    stroke="#444"
                    strokeWidth="2"
                  />
                  {/* Arm pointing right */}
                  <motion.line
                    x1="28"
                    y1="38"
                    x2="38"
                    y2="35"
                    stroke="#555"
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={{ rotate: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ transformOrigin: "28px 38px" }}
                  />
                </motion.svg>
              </motion.div>

              {/* Right Robot - Peeking from right edge */}
              <motion.div
                className="absolute -right-10 top-1/2 -translate-y-1/2 hidden sm:block"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.svg
                  width="40"
                  height="50"
                  viewBox="0 0 40 50"
                  animate={{
                    x: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Antenna with spark */}
                  <motion.circle
                    cx="20"
                    cy="4"
                    r="3"
                    fill="#7A1E2D"
                    animate={{
                      fill: ["#7A1E2D", "#C9A227", "#7A1E2D"],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <line
                    x1="20"
                    y1="7"
                    x2="20"
                    y2="12"
                    stroke="#666"
                    strokeWidth="2"
                  />
                  {/* Head */}
                  <rect
                    x="8"
                    y="12"
                    width="24"
                    height="20"
                    rx="4"
                    fill="#7A1E2D"
                    stroke="#a26c80"
                    strokeWidth="2"
                  />
                  {/* Eyes - Looking Left at timer */}
                  <circle cx="15" cy="22" r="4" fill="#1a1a1a" />
                  <circle cx="25" cy="22" r="4" fill="#1a1a1a" />
                  <motion.circle
                    cx="13"
                    cy="22"
                    r="2"
                    fill="#C9A227"
                    animate={{ scale: [1, 0.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="23"
                    cy="22"
                    r="2"
                    fill="#C9A227"
                    animate={{ scale: [1, 0.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                  {/* Excited mouth */}
                  <ellipse cx="20" cy="28" rx="3" ry="2" fill="#1a1a1a" />
                  {/* Body */}
                  <rect
                    x="12"
                    y="34"
                    width="16"
                    height="10"
                    rx="2"
                    fill="#7A1E2D"
                    stroke="#a26c80"
                    strokeWidth="2"
                  />
                  {/* Arm pointing left */}
                  <motion.line
                    x1="12"
                    y1="38"
                    x2="2"
                    y2="35"
                    stroke="#a26c80"
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={{ rotate: [0, -8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ transformOrigin: "12px 38px" }}
                  />
                </motion.svg>
              </motion.div>

              <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-3">
                Event Starts In
              </p>
              <div className="flex gap-2 md:gap-3 relative">
                {/* Sitting Robot on Days */}
                <motion.div
                  className="absolute -top-10 left-3 hidden sm:block"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.svg
                    width="32"
                    height="35"
                    viewBox="0 0 32 35"
                    animate={{
                      rotate: [-3, 3, -3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "bottom center" }}
                  >
                    {/* Antenna */}
                    <motion.circle
                      cx="16"
                      cy="3"
                      r="2.5"
                      fill="#C9A227"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <line
                      x1="16"
                      y1="5.5"
                      x2="16"
                      y2="9"
                      stroke="#555"
                      strokeWidth="1.5"
                    />
                    {/* Head */}
                    <rect
                      x="6"
                      y="9"
                      width="20"
                      height="14"
                      rx="3"
                      fill="#3D3D3D"
                      stroke="#555"
                      strokeWidth="1.5"
                    />
                    {/* Eyes - Happy */}
                    <circle cx="11" cy="16" r="3" fill="#1a1a1a" />
                    <circle cx="21" cy="16" r="3" fill="#1a1a1a" />
                    <circle cx="11" cy="15.5" r="1.5" fill="#C9A227" />
                    <circle cx="21" cy="15.5" r="1.5" fill="#C9A227" />
                    {/* Big smile */}
                    <path
                      d="M 10 20 Q 16 24 22 20"
                      fill="none"
                      stroke="#C9A227"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    {/* Body */}
                    <rect
                      x="9"
                      y="24"
                      width="14"
                      height="8"
                      rx="2"
                      fill="#3D3D3D"
                      stroke="#555"
                      strokeWidth="1.5"
                    />
                    {/* Legs dangling */}
                    <motion.rect
                      x="10"
                      y="32"
                      width="4"
                      height="3"
                      rx="1"
                      fill="#7A1E2D"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ transformOrigin: "top center" }}
                    />
                    <motion.rect
                      x="18"
                      y="32"
                      width="4"
                      height="3"
                      rx="1"
                      fill="#7A1E2D"
                      animate={{ rotate: [0, -10, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.3,
                      }}
                      style={{ transformOrigin: "top center" }}
                    />
                  </motion.svg>
                </motion.div>

                {/* Days */}
                <div className="text-center">
                  <div
                    className="relative min-w-[40px] h-[44px] md:h-[50px] rounded-lg overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, #2a2a2a 0%, #2a2a2a 49%, #1a1a1a 50%, #1f1f1f 100%)",
                    }}
                  >
                    {/* Number */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-2xl md:text-3xl font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {String(timeLeft.days).padStart(2, "0")}
                      </span>
                    </div>
                    {/* Center line */}
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/60 z-10" />
                    {/* Shine effect on top half */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  </div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-wider mt-1.5 block">
                    Days
                  </span>
                </div>

                {/* Separator */}
                <div className="flex items-center text-white/50 text-xl font-bold pb-3">
                  :
                </div>

                {/* Hours */}
                <div className="text-center">
                  <div
                    className="relative min-w-[40px] h-[44px] md:h-[50px] rounded-lg overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, #2a2a2a 0%, #2a2a2a 49%, #1a1a1a 50%, #1f1f1f 100%)",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-2xl md:text-3xl font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/60 z-10" />
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  </div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-wider mt-1.5 block">
                    Hours
                  </span>
                </div>

                {/* Separator */}
                <div className="flex items-center text-white/50 text-xl font-bold pb-3">
                  :
                </div>

                {/* Minutes */}
                <div className="text-center">
                  <div
                    className="relative min-w-[40px] h-[44px] md:h-[50px] rounded-lg overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, #2a2a2a 0%, #2a2a2a 49%, #1a1a1a 50%, #1f1f1f 100%)",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-2xl md:text-3xl font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/60 z-10" />
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  </div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-wider mt-1.5 block">
                    Mins
                  </span>
                </div>

                {/* Separator */}
                <div className="flex items-center text-white/50 text-xl font-bold pb-3">
                  :
                </div>

                {/* Seconds */}
                <div className="text-center">
                  <div
                    className="relative min-w-[40px] h-[44px] md:h-[50px] rounded-lg overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, #2a2a2a 0%, #2a2a2a 49%, #1a1a1a 50%, #1f1f1f 100%)",
                    }}
                  >
                    <motion.div
                      key={timeLeft.seconds}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className="text-2xl md:text-3xl font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                    </motion.div>
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/60 z-10" />
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  </div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-wider mt-1.5 block">
                    Secs
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          ></motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-2 bg-gray-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h3 className="text-xl font-bold text-white">
                  Register for HACKFEST 2K26
                </h3>
                <button
                  className="text-gray-400 hover:text-white text-3xl leading-none"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>
              <div
                style={{
                  height: "80vh",
                  overflow: "auto",
                  background: "#0B0B0B",
                }}
              >
                <iframe
                  src={formUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  style={{ minHeight: "800px" }}
                  title="Registration Form"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                >
                  Loading…
                </iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
