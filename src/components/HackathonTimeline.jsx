import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";

// Timeline events with normalized hour (0-36 for 36-hour hackathon)
const timelineEvents = [
  {
    time: "09:00",
    title: "Registration Opens",
    description: "Check-in and onboarding",
    day: "Day 1",
    hour: 0,
  },
  {
    time: "09:30",
    title: "Opening Ceremony",
    description: "Welcome address and guidelines",
    day: "Day 1",
    hour: 0.5,
  },
  {
    time: "10:00",
    title: "Hacking Begins",
    description: "Problem statement finalization",
    day: "Day 1",
    hour: 1,
  },
  {
    time: "13:00",
    title: "Lunch",
    description: "Midday break",
    day: "Day 1",
    hour: 4,
  },
  {
    time: "15:30",
    title: "Review I",
    description: "First mentor evaluation",
    day: "Day 1",
    hour: 6.5,
  },
  {
    time: "17:00",
    title: "Refreshments",
    description: "Evening break",
    day: "Day 1",
    hour: 8,
  },
  {
    time: "19:00",
    title: "Review II",
    description: "Second evaluation round",
    day: "Day 1",
    hour: 10,
  },
  {
    time: "20:00",
    title: "Entertainment",
    description: "Cultural program",
    day: "Day 1",
    hour: 11,
  },
  {
    time: "21:00",
    title: "Dinner",
    description: "Evening meal",
    day: "Day 1",
    hour: 12,
  },
  {
    time: "01:00",
    title: "Midnight Fuel",
    description: "Late night refreshments",
    day: "Night",
    hour: 16,
  },
  {
    time: "02:00",
    title: "Checkpoint I",
    description: "Progress review",
    day: "Night",
    hour: 17,
  },
  {
    time: "04:00",
    title: "Early Fuel",
    description: "Pre-dawn refreshments",
    day: "Night",
    hour: 19,
  },
  {
    time: "06:00",
    title: "Checkpoint II",
    description: "Dawn review",
    day: "Day 2",
    hour: 21,
  },
  {
    time: "07:30",
    title: "Breakfast",
    description: "Morning meal",
    day: "Day 2",
    hour: 22.5,
  },
  {
    time: "10:00",
    title: "Review III",
    description: "Third evaluation",
    day: "Day 2",
    hour: 25,
  },
  {
    time: "11:00",
    title: "Refreshments",
    description: "Mid-morning break",
    day: "Day 2",
    hour: 26,
  },
  {
    time: "13:00",
    title: "Lunch",
    description: "Final lunch",
    day: "Day 2",
    hour: 28,
  },
  {
    time: "15:00",
    title: "Final Review",
    description: "Project demonstrations",
    day: "Day 2",
    hour: 30,
  },
  {
    time: "16:00",
    title: "Refreshments",
    description: "Afternoon break",
    day: "Day 2",
    hour: 31,
  },
  {
    time: "18:00",
    title: "Awards Ceremony",
    description: "Prize distribution",
    day: "Day 2",
    hour: 33,
  },
  {
    time: "20:00",
    title: "Closing Dinner",
    description: "Celebratory meal",
    day: "Day 2",
    hour: 35,
  },
  {
    time: "21:00",
    title: "Event Concludes",
    description: "Safe travels",
    day: "Day 2",
    hour: 36,
  },
];

const TOTAL_EVENTS = timelineEvents.length;

// Motivational quotes - one per timeline event in fixed sequential order
const motivationalQuotes = [
  { quote: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { quote: "Code is poetry.", author: "WordPress" },
  { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { quote: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { quote: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { quote: "Rest, refuel, and recharge.", author: "HACKFEST" },
  { quote: "The night is darkest just before the dawn.", author: "Harvey Dent" },
  { quote: "I really liked the environment. The competition was strong.", author: "Sumit, SRM" },
  { quote: "MKCE College's hospitality was excellent.", author: "Keval, SRM" },
  { quote: "The future belongs to those who believe in their dreams.", author: "Eleanor Roosevelt" },
  { quote: "Every morning brings new potential.", author: "HACKFEST" },
  { quote: "Build something people want.", author: "Y Combinator" },
  { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { quote: "Think different.", author: "Apple" },
  { quote: "Your work is going to fill a large part of your life.", author: "Steve Jobs" },
  { quote: "Here's to the crazy ones.", author: "Apple" },
  { quote: "Thank you for being part of this journey.", author: "HACKFEST 2K26" },
];

// Calculate time period based on normalized hour (0-36)
const getTimePeriod = (hour) => {
  const dayHour = hour % 24;
  if (dayHour >= 5 && dayHour < 7) return "dawn";
  if (dayHour >= 7 && dayHour < 12) return "morning";
  if (dayHour >= 12 && dayHour < 14) return "midday";
  if (dayHour >= 14 && dayHour < 17) return "afternoon";
  if (dayHour >= 17 && dayHour < 19) return "evening";
  if (dayHour >= 19 && dayHour < 21) return "dusk";
  return "night";
};

// Period-based visual configurations
const periodConfig = {
  dawn: {
    gradient: [
      "#0a0a12",
      "#0c0c18",
      "#12121f",
      "#1a1825",
      "#2a2035",
      "#3d2d45",
    ],
    orbColor: "rgba(255, 200, 150, 0.9)",
    orbGlow: "rgba(255, 180, 120, 0.15)",
    warmth: 0.3,
    isMoon: false,
  },
  morning: {
    gradient: [
      "#08080f",
      "#0a0a14",
      "#0e0e1a",
      "#141422",
      "#1a1a2e",
      "#22223a",
    ],
    orbColor: "rgba(255, 220, 180, 0.95)",
    orbGlow: "rgba(255, 200, 140, 0.2)",
    warmth: 0.4,
    isMoon: false,
  },
  midday: {
    gradient: [
      "#0a0a10",
      "#0c0c16",
      "#10101c",
      "#161624",
      "#1c1c30",
      "#24243c",
    ],
    orbColor: "rgba(255, 240, 200, 1)",
    orbGlow: "rgba(255, 230, 180, 0.25)",
    warmth: 0.5,
    isMoon: false,
  },
  afternoon: {
    gradient: [
      "#0a0a10",
      "#0c0c15",
      "#0f0f1a",
      "#141420",
      "#1a1a2a",
      "#202036",
    ],
    orbColor: "rgba(255, 210, 160, 0.9)",
    orbGlow: "rgba(255, 190, 130, 0.18)",
    warmth: 0.45,
    isMoon: false,
  },
  evening: {
    gradient: [
      "#08080c",
      "#0a0a10",
      "#0d0d14",
      "#11111a",
      "#161622",
      "#1c1c2a",
    ],
    orbColor: "rgba(255, 160, 100, 0.85)",
    orbGlow: "rgba(255, 140, 80, 0.12)",
    warmth: 0.5,
    isMoon: false,
  },
  dusk: {
    gradient: [
      "#06060a",
      "#08080c",
      "#0a0a10",
      "#0d0d14",
      "#10101a",
      "#141420",
    ],
    orbColor: "rgba(255, 120, 80, 0.7)",
    orbGlow: "rgba(255, 100, 60, 0.08)",
    warmth: 0.4,
    isMoon: false,
  },
  night: {
    gradient: [
      "#040408",
      "#05050a",
      "#06060c",
      "#08080f",
      "#0a0a12",
      "#0c0c16",
    ],
    orbColor: "rgba(220, 220, 240, 0.8)",
    orbGlow: "rgba(200, 200, 230, 0.06)",
    warmth: 0.05,
    isMoon: true,
  },
};

export default function HackathonTimeline() {
  const containerRef = useRef(null);
  const progress = useMotionValue(0);

  // Luxury watch-like smooth spring physics
  const smoothProgress = useSpring(progress, {
    stiffness: 18,
    damping: 35,
    mass: 1.8,
  });

  const velocity = useRef(0);
  const animationRef = useRef(null);
  const lastTickRef = useRef(-1);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Derive active index from smooth progress
  const activeIndex = useTransform(smoothProgress, (p) =>
    Math.round(p * (TOTAL_EVENTS - 1)),
  );

  useEffect(() => {
    const unsubscribe = activeIndex.on("change", (v) => {
      const newIndex = Math.max(0, Math.min(TOTAL_EVENTS - 1, Math.round(v)));
      if (newIndex !== lastTickRef.current) {
        lastTickRef.current = newIndex;
        setCurrentIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [activeIndex]);

  const currentEvent = timelineEvents[currentIndex] || timelineEvents[0];
  const currentHour = currentEvent.hour + 9; // Start at 9 AM
  const currentPeriod = getTimePeriod(currentHour);
  const config = periodConfig[currentPeriod] || periodConfig.morning;
  const currentQuote =
    motivationalQuotes[currentIndex % motivationalQuotes.length];

  // Scroll-based progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      progress.set(value);
    });
    return () => unsubscribe();
  }, [scrollYProgress, progress]);

  // Luxury inertial scrolling with micro-ticking feel
  const applyInertia = () => {
    const friction = 0.965;
    const minVelocity = 0.00003;

    if (Math.abs(velocity.current) > minVelocity) {
      const currentProgress = progress.get();
      let newProgress = currentProgress + velocity.current;

      // Soft boundary dampening
      if (newProgress < 0) {
        newProgress = 0;
        velocity.current *= -0.3;
      } else if (newProgress > 1) {
        newProgress = 1;
        velocity.current *= -0.3;
      }

      progress.set(newProgress);
      velocity.current *= friction;
      animationRef.current = requestAnimationFrame(applyInertia);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const sensitivity = 0.00018;
    const delta = Math.sign(e.deltaY) * sensitivity;
    velocity.current += delta;
    velocity.current = Math.max(-0.012, Math.min(0.012, velocity.current));
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(applyInertia);
  };

  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, progress: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, progress: progress.get() };
    velocity.current = 0;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = dragStart.current.x - e.clientX;
    const sensitivity = 0.0005;
    const newProgress = Math.max(
      0,
      Math.min(1, dragStart.current.progress + deltaX * sensitivity),
    );
    progress.set(newProgress);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaX = dragStart.current.x - e.clientX;
    velocity.current = deltaX * 0.00002;
    velocity.current = Math.max(-0.008, Math.min(0.008, velocity.current));
    animationRef.current = requestAnimationFrame(applyInertia);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Background gradient based on time period
  const backgroundGradient = useMemo(() => {
    const colors = config.gradient;
    return `linear-gradient(180deg, 
      ${colors[0]} 0%, 
      ${colors[1]} 20%, 
      ${colors[2]} 40%, 
      ${colors[3]} 60%, 
      ${colors[4]} 80%, 
      ${colors[5]} 100%
    )`;
  }, [config]);

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="relative"
      style={{ minHeight: "500vh" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          background: backgroundGradient,
          transition: "background 2.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        {/* Ultra-subtle concentric orbital arcs */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop
                offset="50%"
                stopColor={`rgba(180, 170, 150, ${0.015 + config.warmth * 0.02})`}
              />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Outer orbital rings */}
          {[0.85, 0.75, 0.65, 0.55, 0.45].map((scale, i) => (
            <motion.ellipse
              key={i}
              cx="50%"
              cy="85%"
              rx={`${scale * 50}%`}
              ry={`${scale * 35}%`}
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="0.3"
              strokeDasharray={i % 2 === 0 ? "2 40" : "1 60"}
              style={{ opacity: 0.3 - i * 0.05 }}
              animate={{
                rotate: [0, i % 2 === 0 ? 360 : -360],
              }}
              transition={{
                duration: 600 + i * 150,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </svg>

        {/* Atmospheric depth layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Upper atmospheric glow */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: "5%",
              width: "120%",
              height: "50%",
              background: `radial-gradient(ellipse 80% 60% at 50% 100%, 
                rgba(${40 + config.warmth * 30}, ${38 + config.warmth * 20}, ${60}, 0.012) 0%,
                transparent 60%
              )`,
              filter: "blur(80px)",
            }}
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Left depth */}
          <motion.div
            className="absolute"
            style={{
              left: "-10%",
              top: "30%",
              width: "40%",
              height: "50%",
              background: `radial-gradient(ellipse at 30% 50%, 
                rgba(${35 + config.warmth * 20}, ${33 + config.warmth * 15}, ${55}, 0.008) 0%,
                transparent 60%
              )`,
              filter: "blur(60px)",
            }}
            animate={{ x: [0, 15, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Right depth */}
          <motion.div
            className="absolute"
            style={{
              right: "-10%",
              top: "25%",
              width: "40%",
              height: "55%",
              background: `radial-gradient(ellipse at 70% 50%, 
                rgba(${38 + config.warmth * 22}, ${35 + config.warmth * 17}, ${58}, 0.007) 0%,
                transparent 60%
              )`,
              filter: "blur(70px)",
            }}
            animate={{ x: [0, -20, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        </div>

        {/* Horizon glow */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: "30%" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(0deg, 
                rgba(${120 + config.warmth * 80}, ${100 + config.warmth * 60}, ${70 + config.warmth * 30}, ${0.015 + config.warmth * 0.02}) 0%,
                rgba(${80 + config.warmth * 40}, ${70 + config.warmth * 30}, ${55}, 0.008) 40%,
                transparent 80%
              )`,
            }}
          />
          {/* Sharp horizon line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, 
                transparent 10%, 
                rgba(${160 + config.warmth * 60}, ${140 + config.warmth * 45}, ${100 + config.warmth * 20}, ${0.03 + config.warmth * 0.04}) 50%,
                transparent 90%
              )`,
            }}
          />
        </div>

        {/* Main hemispherical arc visualization */}
        <div
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2"
          style={{
            width: "1200px",
            height: "560px",
            maxWidth: "95vw",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {/* Arc path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 560"
            preserveAspectRatio="xMidYMax meet"
          >
            {/* Main arc guide - extremely subtle */}
            <path
              d="M 0 500 Q 600 60 1200 500"
              fill="none"
              stroke={`rgba(180, 170, 150, ${0.02 + config.warmth * 0.02})`}
              strokeWidth="0.5"
            />

            {/* Secondary arc - even more subtle */}
            <path
              d="M 50 520 Q 600 100 1150 520"
              fill="none"
              stroke={`rgba(160, 150, 140, 0.01)`}
              strokeWidth="0.3"
              strokeDasharray="2 20"
            />
          </svg>

          {/* Checkpoint dots along the arc */}
          {timelineEvents.map((event, index) => {
            const normalizedPos = index / (TOTAL_EVENTS - 1);
            const angle = -70 + normalizedPos * 140;
            const angleRad = (angle * Math.PI) / 180;
            const x = 600 + Math.sin(angleRad) * 550;
            const y = 500 - Math.cos(angleRad) * 380;

            return (
              <CheckpointDot
                key={index}
                x={x}
                y={y}
                index={index}
                normalizedPos={normalizedPos}
                smoothProgress={smoothProgress}
                isActive={index === currentIndex}
                config={config}
              />
            );
          })}

          {/* The Orb - sun/moon abstraction */}
          <CelestialOrb
            smoothProgress={smoothProgress}
            config={config}
            currentPeriod={currentPeriod}
          />
        </div>

        {/* Motivational quote - positioned above celestial orb */}
        <div className="absolute top-[18%] sm:top-[20%] left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <motion.div
            key={currentQuote.quote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-md px-6"
          >
            <p
              className="text-xs sm:text-sm md:text-base font-light text-neutral-400/50 italic leading-relaxed mb-1"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              "{currentQuote.quote}"
            </p>
            <p className="text-[10px] sm:text-xs text-neutral-500/40 tracking-widest uppercase">
              — {currentQuote.author}
            </p>
          </motion.div>
        </div>

        {/* Event details - larger, more visible */}
        <div className="absolute bottom-8 left-0 right-0 px-8 z-20">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Large time display */}
              <p
                className="text-5xl sm:text-6xl md:text-7xl font-extralight text-white mb-4 tabular-nums"
                style={{
                  fontFamily:
                    "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
                  letterSpacing: "0.1em",
                  textShadow: `0 0 40px rgba(200, 180, 140, ${0.2 + config.warmth * 0.2})`,
                }}
              >
                {currentEvent.time}
              </p>

              {/* Event title - larger */}
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-medium text-neutral-200 mb-3 tracking-wide"
                style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
              >
                {currentEvent.title}
              </h3>

              {/* Description - more visible */}
              <p className="text-sm sm:text-base text-neutral-400 tracking-wide max-w-md mx-auto">
                {currentEvent.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Day indicator - more visible */}
        <div className="absolute top-24 left-8 z-20">
          <motion.div
            key={currentEvent.day}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-4"
          >
            <div
              className="w-1 h-10 rounded-full"
              style={{
                background: `linear-gradient(180deg, rgba(200, 180, 140, ${0.6 + config.warmth * 0.3}) 0%, rgba(180, 160, 120, 0.2) 100%)`,
                boxShadow: `0 0 12px rgba(200, 180, 140, ${0.15 + config.warmth * 0.1})`,
              }}
            />
            <div className="flex flex-col gap-1">
              <span className="text-sm uppercase tracking-[0.25em] text-neutral-300 font-semibold">
                {currentEvent.day}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                36-Hour Hackathon
              </span>
            </div>
          </motion.div>
        </div>

        {/* Progress indicator - more visible */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-4">
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ width: 160, background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: useTransform(smoothProgress, (p) => `${p * 100}%`),
                  background: `linear-gradient(90deg, rgba(200, 180, 140, 0.6), rgba(200, 180, 140, 0.3))`,
                  boxShadow: "0 0 10px rgba(200, 180, 140, 0.3)",
                }}
              />
            </div>
            <span className="text-xs text-neutral-400 tabular-nums font-medium tracking-wider">
              {String(currentIndex + 1).padStart(2, "0")} / {TOTAL_EVENTS}
            </span>
          </div>
        </div>

        {/* Fine grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.02,
            mixBlendMode: "overlay",
          }}
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, rgba(4, 4, 8, 0.5) 100%)",
          }}
        />
      </div>
    </section>
  );
}

// Checkpoint dots along the arc
const CheckpointDot = React.memo(
  ({ x, y, index, normalizedPos, smoothProgress, isActive, config }) => {
    const dotOpacity = useTransform(smoothProgress, (p) => {
      const diff = Math.abs(normalizedPos - p);
      if (diff > 0.2) return 0.1;
      if (diff < 0.03) return 1;
      return 0.1 + (1 - diff * 5) * 0.6;
    });

    const dotScale = useTransform(smoothProgress, (p) => {
      const diff = Math.abs(normalizedPos - p);
      if (diff < 0.03) return 1;
      return 0.4 + (1 - Math.min(diff * 4, 1)) * 0.3;
    });

    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: x,
          top: y,
          x: "-50%",
          y: "-50%",
          opacity: dotOpacity,
          scale: dotScale,
        }}
      >
        {/* Outer glow for active */}
        {isActive && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 28,
              height: 28,
              left: -10,
              top: -10,
              background: `radial-gradient(circle, ${config.orbGlow} 0%, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Dot */}
        <div
          className="rounded-full"
          style={{
            width: isActive ? 8 : 3,
            height: isActive ? 8 : 3,
            background: isActive
              ? config.orbColor
              : `rgba(180, 170, 160, ${0.15 + config.warmth * 0.1})`,
            boxShadow: isActive ? `0 0 16px ${config.orbGlow}` : "none",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </motion.div>
    );
  },
);

// Realistic Sun Component with intensity control
const RealisticSun = React.memo(({ size, config, intensity = 1 }) => {
  const sunSize = size || 48;

  // Adjust colors based on intensity (dimmer = more orange/red, brighter = more yellow/white)
  const getIntensityColors = (i) => {
    // At low intensity (sunset/sunrise), shift towards orange-red
    // At high intensity (midday), shift towards bright yellow-white
    const coreR = 255;
    const coreG = Math.round(255 * (0.7 + i * 0.3));
    const coreB = Math.round(230 * i);

    const midR = 255;
    const midG = Math.round(180 + i * 65);
    const midB = Math.round(60 * i);

    const edgeR = 255;
    const edgeG = Math.round(100 + i * 50);
    const edgeB = Math.round(30 * i);

    return {
      core: `rgba(${coreR}, ${coreG}, ${coreB}, 1)`,
      mid: `rgba(${midR}, ${midG}, ${midB}, 1)`,
      edge: `rgba(${edgeR}, ${edgeG}, ${edgeB}, 1)`,
      glowInner: `rgba(255, ${180 + i * 20}, ${80 + i * 20}, ${0.5 + i * 0.3})`,
      glowOuter: `rgba(255, ${150 + i * 30}, ${50 + i * 30}, ${0.2 + i * 0.1})`,
    };
  };

  const colors = getIntensityColors(intensity);

  return (
    <div className="relative" style={{ width: sunSize, height: sunSize }}>
      {/* Sun surface with texture */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: sunSize,
          height: sunSize,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `
            radial-gradient(circle at 35% 35%, 
              ${colors.core} 0%,
              rgba(255, ${220 + intensity * 25}, ${120 * intensity}, 1) 20%,
              ${colors.mid} 50%,
              ${colors.edge} 80%,
              rgba(255, ${100 + intensity * 50}, ${30 * intensity}, 1) 100%
            )
          `,
          boxShadow: `
            0 0 ${sunSize * 0.8 * intensity}px ${colors.glowInner},
            0 0 ${sunSize * 1.5 * intensity}px ${colors.glowOuter},
            0 0 ${sunSize * 2.5 * intensity}px rgba(255, 150, 50, ${0.3 * intensity}),
            inset -${sunSize * 0.08}px -${sunSize * 0.08}px ${sunSize * 0.2}px rgba(255, 150, 50, ${0.4 * intensity}),
            inset ${sunSize * 0.05}px ${sunSize * 0.05}px ${sunSize * 0.15}px rgba(255, 255, 220, ${0.5 * intensity})
          `,
        }}
      >
        {/* Solar granulation texture overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.08,
            mixBlendMode: "overlay",
          }}
          animate={{ opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sunspots */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: sunSize * 0.12,
            height: sunSize * 0.12,
            left: "30%",
            top: "40%",
            background:
              "radial-gradient(circle, rgba(200, 120, 50, 0.5) 0%, rgba(255, 180, 80, 0.3) 60%, transparent 100%)",
            filter: "blur(1px)",
          }}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: sunSize * 0.08,
            height: sunSize * 0.08,
            left: "55%",
            top: "35%",
            background:
              "radial-gradient(circle, rgba(200, 120, 50, 0.4) 0%, rgba(255, 180, 80, 0.2) 60%, transparent 100%)",
            filter: "blur(1px)",
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Solar flare highlights */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: sunSize * 0.25,
            height: sunSize * 0.15,
            right: "-5%",
            top: "25%",
            background:
              "radial-gradient(ellipse at center, rgba(255, 255, 220, 0.6) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </div>
  );
});

// Realistic Moon Component
const RealisticMoon = React.memo(({ size }) => {
  const moonSize = size || 40;

  // Crater data for realistic moon surface
  const craters = useMemo(
    () => [
      { x: 25, y: 20, size: 18, depth: 0.15 },
      { x: 60, y: 35, size: 12, depth: 0.12 },
      { x: 35, y: 60, size: 15, depth: 0.14 },
      { x: 70, y: 65, size: 10, depth: 0.1 },
      { x: 45, y: 40, size: 8, depth: 0.08 },
      { x: 20, y: 55, size: 11, depth: 0.11 },
      { x: 55, y: 20, size: 9, depth: 0.09 },
      { x: 75, y: 45, size: 7, depth: 0.07 },
      { x: 30, y: 75, size: 13, depth: 0.12 },
      { x: 65, y: 80, size: 8, depth: 0.08 },
    ],
    [],
  );

  // Mare (dark regions) data
  const maria = useMemo(
    () => [
      { x: 30, y: 30, width: 35, height: 25, rotation: -15 },
      { x: 55, y: 55, width: 28, height: 20, rotation: 30 },
      { x: 25, y: 60, width: 22, height: 18, rotation: -10 },
    ],
    [],
  );

  return (
    <div className="relative" style={{ width: moonSize, height: moonSize }}>
      {/* Outer lunar halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: moonSize * 6,
          height: moonSize * 6,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, 
            rgba(200, 210, 230, 0.06) 0%,
            rgba(180, 190, 210, 0.03) 40%,
            transparent 70%
          )`,
          filter: "blur(20px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lunar glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: moonSize * 2.5,
          height: moonSize * 2.5,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, 
            rgba(220, 225, 240, 0.2) 0%,
            rgba(200, 210, 230, 0.1) 40%,
            transparent 70%
          )`,
          filter: "blur(10px)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moon surface */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: moonSize,
          height: moonSize,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `
            radial-gradient(circle at 30% 30%, 
              rgba(245, 245, 250, 1) 0%,
              rgba(220, 220, 230, 1) 30%,
              rgba(190, 190, 205, 1) 60%,
              rgba(160, 160, 180, 1) 100%
            )
          `,
          boxShadow: `
            0 0 ${moonSize * 0.5}px rgba(200, 210, 230, 0.4),
            0 0 ${moonSize}px rgba(180, 190, 210, 0.2),
            inset -${moonSize * 0.15}px ${moonSize * 0.1}px ${moonSize * 0.25}px rgba(80, 80, 100, 0.25),
            inset ${moonSize * 0.08}px -${moonSize * 0.05}px ${moonSize * 0.15}px rgba(255, 255, 255, 0.2)
          `,
        }}
      >
        {/* Lunar mare (dark regions) */}
        {maria.map((mare, i) => (
          <div
            key={`mare-${i}`}
            className="absolute"
            style={{
              left: `${mare.x}%`,
              top: `${mare.y}%`,
              width: `${mare.width}%`,
              height: `${mare.height}%`,
              transform: `translate(-50%, -50%) rotate(${mare.rotation}deg)`,
              background: `radial-gradient(ellipse, 
                rgba(100, 105, 120, 0.25) 0%,
                rgba(120, 125, 140, 0.15) 50%,
                transparent 80%
              )`,
              borderRadius: "50%",
              filter: "blur(2px)",
            }}
          />
        ))}

        {/* Craters */}
        {craters.map((crater, i) => (
          <div
            key={`crater-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${crater.x}%`,
              top: `${crater.y}%`,
              width: `${crater.size}%`,
              height: `${crater.size}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle at 35% 35%, 
                rgba(255, 255, 255, ${crater.depth * 0.5}) 0%,
                rgba(200, 200, 210, ${crater.depth * 0.3}) 30%,
                rgba(130, 130, 150, ${crater.depth}) 60%,
                rgba(160, 160, 175, ${crater.depth * 0.5}) 100%
              )`,
              boxShadow: `
                inset -1px -1px 2px rgba(80, 80, 100, ${crater.depth}),
                inset 1px 1px 1px rgba(255, 255, 255, ${crater.depth * 0.3})
              `,
            }}
          />
        ))}

        {/* Surface texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.06,
            mixBlendMode: "multiply",
          }}
        />

        {/* Terminator shadow (day/night boundary on moon) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(115deg, 
              transparent 0%,
              transparent 40%,
              rgba(30, 30, 50, 0.15) 55%,
              rgba(20, 20, 40, 0.25) 70%,
              rgba(10, 10, 25, 0.4) 100%
            )`,
          }}
        />
      </div>
    </div>
  );
});

// The celestial orb container (sun/moon) with smooth transition
const CelestialOrb = React.memo(({ smoothProgress, config, currentPeriod }) => {
  // Calculate position on the arc
  const orbX = useTransform(smoothProgress, (p) => {
    const angle = -70 + p * 140;
    const angleRad = (angle * Math.PI) / 180;
    return 600 + Math.sin(angleRad) * 550;
  });

  const orbY = useTransform(smoothProgress, (p) => {
    const angle = -70 + p * 140;
    const angleRad = (angle * Math.PI) / 180;
    return 500 - Math.cos(angleRad) * 380;
  });

  // Calculate sun/moon visibility based on period for smooth transition
  // Sun is brightest at midday, dims towards dusk/dawn, invisible at night
  // Moon appears during dusk, peaks at night, fades at dawn
  const getSunMoonTransition = (period) => {
    switch (period) {
      case "morning":
        return {
          sunOpacity: 0.9,
          sunScale: 1,
          moonOpacity: 0,
          sunIntensity: 0.9,
        };
      case "midday":
        return {
          sunOpacity: 1,
          sunScale: 1.1,
          moonOpacity: 0,
          sunIntensity: 1,
        };
      case "afternoon":
        return {
          sunOpacity: 0.95,
          sunScale: 1.05,
          moonOpacity: 0,
          sunIntensity: 0.95,
        };
      case "evening":
        return {
          sunOpacity: 0.7,
          sunScale: 0.9,
          moonOpacity: 0.15,
          sunIntensity: 0.7,
        };
      case "dusk":
        return {
          sunOpacity: 0.4,
          sunScale: 0.75,
          moonOpacity: 0.5,
          sunIntensity: 0.5,
        };
      case "night":
        return {
          sunOpacity: 0,
          sunScale: 0.5,
          moonOpacity: 1,
          sunIntensity: 0,
        };
      case "dawn":
        return {
          sunOpacity: 0.3,
          sunScale: 0.7,
          moonOpacity: 0.6,
          sunIntensity: 0.4,
        };
      default:
        return { sunOpacity: 1, sunScale: 1, moonOpacity: 0, sunIntensity: 1 };
    }
  };

  const transition = getSunMoonTransition(currentPeriod);
  const baseSunSize = 52;
  const baseMoonSize = 36;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: orbX,
        top: orbY,
        x: "-50%",
        y: "-50%",
      }}
    >
      {/* Sun with intensity-based rendering */}
      <motion.div
        initial={false}
        animate={{
          opacity: transition.sunOpacity,
          scale: transition.sunScale,
        }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
      >
        <RealisticSun
          size={baseSunSize}
          config={config}
          intensity={transition.sunIntensity}
        />
      </motion.div>

      {/* Moon with crossfade */}
      <motion.div
        initial={false}
        animate={{
          opacity: transition.moonOpacity,
          scale:
            transition.moonOpacity > 0.5
              ? 1
              : 0.8 + transition.moonOpacity * 0.4,
        }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
      >
        <RealisticMoon size={baseMoonSize} />
      </motion.div>
    </motion.div>
  );
});
