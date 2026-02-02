import React from "react";
import { motion } from "framer-motion";
import qrImage from "./QR.png";

// Jury Panel data - placeholder images to be replaced later
const juryMembers = [
  {
    name: "Jury Member 1",
    designation: "Industry Expert",
    company: "Tech Company",
    image: null,
  },
  {
    name: "Jury Member 2",
    designation: "Senior Engineer",
    company: "Innovation Labs",
    image: null,
  },
  {
    name: "Jury Member 3",
    designation: "Tech Lead",
    company: "Startup Inc",
    image: null,
  },
  {
    name: "Jury Member 4",
    designation: "Professor",
    company: "University",
    image: null,
  },
];

// Premium Jury Card Component - 2x2 Grid Style
const JuryCard = ({ jury, index }) => (
  <motion.div
    className="relative text-center p-7"
    style={{
      background:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%)",
      borderRadius: "24px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow:
        "0 0 0 1px rgba(255, 255, 255, 0.02), 0 16px 48px rgba(0, 0, 0, 0.28)",
      backdropFilter: "blur(8px)",
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 * index, duration: 0.5, ease: "easeOut" }}
    whileHover={{
      background:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.02) 100%)",
      border: "1px solid rgba(212, 175, 55, 0.2)",
    }}
  >
    {/* Profile Image/Avatar */}
    <div
      className="w-16 h-16 mx-auto mb-5 rounded-full overflow-hidden flex items-center justify-center"
      style={{
        background: jury.image
          ? "transparent"
          : "linear-gradient(145deg, rgba(200, 200, 200, 0.18) 0%, rgba(212, 175, 55, 0.12) 100%)",
        border: "2px solid transparent",
        borderImage:
          "linear-gradient(145deg, rgba(200, 200, 200, 0.35), rgba(212, 175, 55, 0.35)) 1",
        borderImageSlice: 1,
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
            background: "linear-gradient(145deg, #C0C0C0, #D4AF37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
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

    {/* Name - Silver gradient */}
    <h4
      style={{
        background: "linear-gradient(180deg, #E8E8E8 0%, #A8A8A8 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
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

    {/* Designation - Gold accent */}
    <p
      style={{
        background: "linear-gradient(180deg, #D4AF37 0%, #C9A227 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontSize: "0.75rem",
        fontWeight: "500",
        letterSpacing: "0.03em",
        marginBottom: "2px",
        fontFamily:
          "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {jury.designation}
    </p>

    {/* Company - Muted silver */}
    <p
      style={{
        color: "rgba(192, 192, 192, 0.5)",
        fontSize: "0.7rem",
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

  return (
    <section
      id="register"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1A1A1A 0%, #0F0F0F 50%, #080808 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Ambient silver/gold light effect - top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.04) 0%, rgba(192, 192, 192, 0.02) 40%, transparent 70%)",
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
          {/* Registration Open Badge - #FFF924 */}
          <motion.span
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.15em] mb-10"
            style={{
              background: "#FFF924",
              color: "#0A0A0A",
              fontFamily:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              boxShadow:
                "0 0 30px rgba(255, 249, 36, 0.3), 0 0 60px rgba(255, 249, 36, 0.1)",
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

        {/* Structural Frame */}
        <div
          className="relative"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%)",
            borderRadius: "32px",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            boxShadow:
              "0 0 0 1px rgba(255, 255, 255, 0.02), 0 28px 80px rgba(0, 0, 0, 0.35)",
            padding: "28px",
          }}
        >
          <div
            className="absolute inset-x-6 top-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)",
            }}
          />
          <div
            className="absolute inset-x-6 bottom-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent)",
            }}
          />
          <div
            className="hidden lg:block absolute top-12 bottom-12 left-1/2 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.08), transparent)",
            }}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* QR Code Section */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.a
                href={qrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* QR Container with subtle glow */}
                <div className="relative p-4">
                  {/* Ambient glow */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, rgba(192, 192, 192, 0.05) 50%, transparent 70%)",
                      filter: "blur(50px)",
                    }}
                  />

                  {/* QR Image Container */}
                  <div
                    className="relative rounded-3xl overflow-hidden"
                    style={{
                      width: "280px",
                      height: "280px",
                      background: "#F7F7F7",
                      padding: "18px",
                      boxShadow:
                        "0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 0 0 1px rgba(0, 0, 0, 0.04)",
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

                {/* CTA Text */}
                <div className="text-center mt-8">
                  <p
                    className="text-xs uppercase tracking-[0.2em] font-normal mb-3"
                    style={{
                      color: "rgba(192, 192, 192, 0.4)",
                      fontFamily:
                        "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  >
                    Scan or tap to register
                  </p>
                  <p
                    className="text-lg font-medium flex items-center justify-center gap-3 group-hover:gap-4 transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(180deg, #E8E8E8 0%, #B8B8B8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontFamily:
                        "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Join HACKFEST 2K26
                    <span
                      className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(180deg, #D4AF37 0%, #C9A227 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      →
                    </span>
                  </p>
                </div>
              </motion.a>
            </motion.div>

            {/* Jury Panel Section - 2x2 Grid */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              {/* Section Header */}
              <div className="mb-8 text-center lg:text-left">
                {/* Label - Gold */}
                <span
                  className="text-xs uppercase tracking-[0.2em] font-medium mb-3 block"
                  style={{
                    background:
                      "linear-gradient(180deg, #D4AF37 0%, #C9A227 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontFamily:
                      "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  }}
                >
                  Jury Panel
                </span>

                {/* Title - Silver gradient */}
                <h3
                  className="text-2xl md:text-3xl font-semibold mb-2"
                  style={{
                    background:
                      "linear-gradient(180deg, #FFFFFF 0%, #C0C0C0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontFamily:
                      "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Expert Judges
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "rgba(192, 192, 192, 0.45)",
                    fontFamily:
                      "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Distinguished professionals evaluating your innovations
                </p>
              </div>

              {/* Jury Grid - 2x2 */}
              <div className="grid grid-cols-2 gap-5">
                {juryMembers.map((jury, index) => (
                  <JuryCard key={index} jury={jury} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ambient light effect - bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(192, 192, 192, 0.02) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
