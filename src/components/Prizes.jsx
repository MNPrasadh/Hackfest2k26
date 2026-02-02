import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

// Particle Background Component
function ParticleBackground() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: "rgba(201, 162, 39, 0.9)",
            boxShadow: `0 0 ${particle.size * 3}px rgba(201, 162, 39, 1)`,
          }}
          animate={{
            y: [0, -400, 0],
            x: [0, Math.sin(particle.id) * 100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}

// Animated Counter Component - Smooth fast counter
function AnimatedCounter({ value, duration = 1.2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Smooth easing with cubic bezier feel
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        // Calculate current value with smooth interpolation
        const currentValue = Math.floor(easeOutQuart * value);

        // Round to nearest 1000 for big jumps but smooth transition
        const roundedValue =
          progress < 0.9
            ? Math.round(currentValue / 1000) * 1000
            : currentValue;

        setDisplayValue(roundedValue);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  // Format number with Indian comma notation
  const formatNumber = (num) => {
    return num.toLocaleString("en-IN");
  };

  return <span ref={ref}>{formatNumber(displayValue)}</span>;
}

// Order: 2nd (left), 1st (center), 3rd (right)
const prizes = [
  {
    position: "2nd",
    rank: "#2",
    amount: "₹25,000",
    color: {
      primary: "#C0C0C0",
      secondary: "#A8A8A8",
      glow: "rgba(192, 192, 192, 0.3)",
      glowHover: "rgba(192, 192, 192, 0.5)",
    },
  },
  {
    position: "1st",
    rank: "#1",
    amount: "₹50,000",
    highlight: true,
    color: {
      primary: "#FFD700",
      secondary: "#FFA500",
      glow: "rgba(255, 215, 0, 0.35)",
      glowHover: "rgba(255, 215, 0, 0.6)",
    },
  },
  {
    position: "3rd",
    rank: "#3",
    amount: "₹15,000",
    color: {
      primary: "#CD7F32",
      secondary: "#B87333",
      glow: "rgba(205, 127, 50, 0.3)",
      glowHover: "rgba(205, 127, 50, 0.5)",
    },
  },
];

export default function Prizes() {
  const ref = useRef(null);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const prizePoolY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  // Border animation - grows horizontally from center outward simultaneously
  const borderWidth = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.section
      ref={ref}
      id="prizes"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* Animated Left Border */}
      <motion.div
        className="absolute left-0 top-0 h-full pointer-events-none"
        style={{
          width: borderWidth,
          background: "linear-gradient(90deg, #C9A227, transparent)",
          borderRight: "1px solid #C9A227",
        }}
      />

      {/* Animated Right Border */}
      <motion.div
        className="absolute right-0 top-0 h-full pointer-events-none"
        style={{
          width: borderWidth,
          background: "linear-gradient(90deg, transparent, #C9A227)",
          borderLeft: "1px solid #C9A227",
        }}
      />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="inline-block px-3 py-1.5 rounded-full bg-white/8 text-gray-400 font-semibold text-xs tracking-wider uppercase mb-3">
            Rewards
          </span>
          <h2
            className="font-bold text-white"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            }}
          >
            Prize Pool
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Compete for exciting cash prizes
          </p>
        </motion.div>

        {/* Total Prize with Parallax */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ y: prizePoolY }}
        >
          <div
            className="inline-block px-8 py-5 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}
          >
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
              Total Prize Pool
            </p>
            <p
              className="font-bold text-white mb-0"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 6vw, 3rem)",
              }}
            >
              ₹<AnimatedCounter value={100000} duration={2} />
              <span className="text-gray-500">+</span>
            </p>
          </div>
        </motion.div>

        {/* Prize Cards with Parallax */}
        <motion.div style={{ y: cardsY }}>
          <Row className="g-4 justify-content-center align-items-end">
            {prizes.map((prize, index) => (
              <Col key={index} xs={10} sm={6} md={4} lg={3}>
                <motion.div
                  className="text-center rounded-xl h-full relative overflow-visible"
                  style={{
                    background: "rgba(15, 15, 15, 0.6)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: `1px solid rgba(255, 255, 255, 0.06)`,
                    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 24px ${prize.color.glow}`,
                    minHeight: prize.highlight ? "200px" : "180px",
                    padding: "1.5rem 1.25rem",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  whileHover={{
                    y: -4,
                    boxShadow: `0 12px 36px rgba(0, 0, 0, 0.4), 0 0 40px ${prize.color.glowHover}`,
                    border: `1px solid rgba(255, 255, 255, 0.12)`,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                >
                  {/* Rank Badge */}
                  <div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                    style={{
                      background: `linear-gradient(135deg, ${prize.color.primary}, ${prize.color.secondary})`,
                      padding: "0.35rem 1rem",
                      borderRadius: "1.5rem",
                      boxShadow: `0 2px 12px ${prize.color.glow}`,
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <span
                      className="font-bold text-sm"
                      style={{
                        color: "#000",
                        fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {prize.rank}
                    </span>
                  </div>

                  {/* Position Text */}
                  <p
                    className="text-xs uppercase tracking-widest mb-4 mt-3"
                    style={{
                      color: prize.color.primary,
                      fontWeight: "600",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {prize.position} Place
                  </p>

                  {/* Decorative Line */}
                  <div
                    className="mx-auto mb-4"
                    style={{
                      width: "40px",
                      height: "1px",
                      background: `linear-gradient(90deg, transparent, ${prize.color.primary}, transparent)`,
                      opacity: 0.5,
                    }}
                  />

                  {/* Amount */}
                  <p
                    className="font-bold mb-0"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "clamp(1.5rem, 4vw, 2rem)",
                      background: `linear-gradient(135deg, ${prize.color.primary}, ${prize.color.secondary})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {prize.amount}
                  </p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Consolation Prizes Box */}
        <motion.div
          className="flex justify-center mt-5"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="relative px-4 py-2 rounded-lg text-center overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 0 16px rgba(255, 255, 255, 0.08)",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 24px rgba(255, 255, 255, 0.15)",
            }}
            transition={{ duration: 0.25 }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.5,
              }}
            />

            <p
              className="text-base md:text-lg font-bold mb-0 text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              5 Consolation Prizes
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-gray-500 text-xs mt-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          + Certificates for all participants
        </motion.p>
      </div>
    </motion.section>
  );
}
