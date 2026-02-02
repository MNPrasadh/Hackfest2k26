import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import qrImage from "./QR.png";

// Jury Panel data - placeholder images to be replaced later
const juryMembers = [
  {
    name: "Jury Member 1",
    designation: "Revealed Soon",
    company: "",
    image: null,
  },
  {
    name: "Jury Member 2",
    designation: "Revealed Soon",
    company: "",
    image: null,
  },
  {
    name: "Jury Member 3",
    designation: "Revealed Soon",
    company: "",
    image: null,
  },
  {
    name: "Jury Member 4",
    designation: "Revealed Soon",
    company: "",
    image: null,
  },
];

// Professional Jury Card Component
const JuryCard = ({ jury, index }) => (
  <motion.div
    className="relative text-center p-6"
    style={{
      background:
        "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(12px)",
    }}
    initial={{ opacity: 0, y: 20, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 * index, duration: 0.5, ease: "easeOut" }}
    whileHover={{
      scale: 1.02,
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
    }}
  >
    {/* Profile Image/Avatar */}
    <div className="relative mx-auto mb-4 w-16 h-16">
      <div
        className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
        style={{
          background: jury.image
            ? "transparent"
            : "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          border: "2px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        {jury.image ? (
          <img
            src={jury.image}
            alt={jury.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1.25rem",
              fontWeight: "600",
              fontFamily:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {jury.name.split(" ").pop().charAt(0)}
          </span>
        )}
      </div>
    </div>

    {/* Name */}
    <h4
      style={{
        color: "#FFFFFF",
        fontSize: "1rem",
        fontWeight: "600",
        fontFamily:
          "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        letterSpacing: "-0.01em",
        marginBottom: "4px",
      }}
    >
      {jury.name}
    </h4>

    {/* Designation */}
    <p
      style={{
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: "0.8rem",
        fontWeight: "500",
        letterSpacing: "0.02em",
        marginBottom: "2px",
        fontFamily:
          "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {jury.designation}
    </p>

    {/* Company */}
    <p
      style={{
        color: "rgba(255, 255, 255, 0.4)",
        fontSize: "0.72rem",
        fontWeight: "400",
        fontFamily:
          "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {jury.company}
    </p>
  </motion.div>
);

export default function RegisterQR() {
  const qrUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfx5y8ipMxMeMXmI_hGmv1NmFDeql8JKpo4MXdoeeWyXqYdMA/viewform?usp=dialog";

  // Ref for the section
  const sectionRef = useRef(null);

  // Scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 3D Parallax transforms - apply to section only
  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0.92, 1, 1],
  );
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [0, 0.6, 1],
  );
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.35], [12, 0]);

  return (
    <motion.section
      ref={sectionRef}
      id="register"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1A1A1A 0%, #0F0F0F 50%, #080808 100%)",
        minHeight: "100vh",
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
        scale: sectionScale,
        opacity: sectionOpacity,
        rotateX: sectionRotateX,
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Floating Particles - Background Layer */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.1)`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Mid-depth particles */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 3 + "px",
              height: Math.random() * 6 + 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: `rgba(34, 197, 94, ${Math.random() * 0.2 + 0.05})`,
              boxShadow: `0 0 ${Math.random() * 15 + 8}px rgba(34, 197, 94, 0.15)`,
            }}
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Foreground particles */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[1px]"
            style={{
              width: Math.random() * 8 + 4 + "px",
              height: Math.random() * 8 + 4 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.03})`,
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 1.5,
            }}
          />
        ))}
      </motion.div>

      {/* Background ambient glow with parallax */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(34, 197, 94, 0.06) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)",
        }}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 py-24 md:py-32 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Registration Open Badge - Green */}
          <motion.span
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.15em] mb-10"
            style={{
              background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
              color: "#FFFFFF",
              fontFamily:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              boxShadow:
                "0 0 30px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.15)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Registration Open
          </motion.span>

          {/* Main Heading - Silver gradient */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #C0C0C0 50%, #A0A0A0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Ready to Participate?
          </h2>

          {/* Subheading - Muted silver */}
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{
              color: "rgba(192, 192, 192, 0.6)",
              fontFamily:
                "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              lineHeight: 1.7,
              fontWeight: "400",
              letterSpacing: "0.01em",
            }}
          >
            Join innovators at HACKFEST 2K26. Scan to register and be part of
            something extraordinary.
          </p>
        </motion.div>

        {/* Professional Frame */}
        <div
          className="relative"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 24px 64px rgba(0, 0, 0, 0.4)",
            padding: "40px",
          }}
        >
          {/* Jury Panel Section Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-xs uppercase tracking-[0.2em] font-medium mb-3 block"
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontFamily:
                  "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Meet Our
            </span>

            <h3
              className="text-2xl md:text-3xl font-semibold mb-3"
              style={{
                color: "#FFFFFF",
                fontFamily:
                  "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Expert Jury Panel
            </h3>
            <p
              className="text-sm max-w-md mx-auto"
              style={{
                color: "rgba(255, 255, 255, 0.45)",
                fontFamily:
                  "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: "400",
              }}
            >
              Industry leaders evaluating your innovations
            </p>
          </motion.div>

          {/* Jury Grid with QR in Center - 3 Column Layout with 3D Depth */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            {/* Left Column - 2 Jury Members */}
            <div className="flex flex-col gap-6">
              {juryMembers.slice(0, 2).map((jury, index) => (
                <JuryCard key={index} jury={jury} index={index} />
              ))}
            </div>

            {/* Center - QR Code */}
            <div className="flex flex-col items-center order-first lg:order-none my-8 lg:my-0">
              <motion.a
                href={qrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* QR Container */}
                <div className="relative p-4">
                  {/* Subtle glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
                      filter: "blur(30px)",
                    }}
                  />

                  {/* Clean frame around QR */}
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                      border: "2px solid rgba(255, 255, 255, 0.15)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{
                        width: "220px",
                        height: "220px",
                        background: "#FFFFFF",
                        padding: "14px",
                      }}
                    >
                      <img
                        src={qrImage}
                        alt="QR Code - Scan to Register"
                        className="w-full h-full object-contain"
                        style={{
                          imageRendering: "crisp-edges",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* CTA Text */}
                <div className="text-center mt-5">
                  <p
                    className="text-xs uppercase tracking-[0.15em] font-medium mb-2"
                    style={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontFamily:
                        "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    Click / Scan to Register
                  </p>
                  <p
                    className="text-base font-medium flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300"
                    style={{
                      color: "#FFFFFF",
                      fontFamily:
                        "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Join HACKFEST 2K26
                    <span
                      className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: "rgba(255, 255, 255, 0.8)" }}
                    >
                      →
                    </span>
                  </p>
                </div>
              </motion.a>
            </div>

            {/* Right Column - 2 Jury Members */}
            <div className="flex flex-col gap-6">
              {juryMembers.slice(2, 4).map((jury, index) => (
                <JuryCard key={index + 2} jury={jury} index={index + 2} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ambient light effect - bottom with parallax */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(34, 197, 94, 0.03) 0%, transparent 70%)",
        }}
      />
    </motion.section>
  );
}
