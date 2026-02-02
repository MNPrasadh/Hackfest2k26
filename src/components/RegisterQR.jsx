import React from "react";
import { motion } from "framer-motion";
import qrImage from "./QR.png";

// Testimonial data
const testimonials = [
  {
    name: "Asma",
    college: "K. Ramakrishnan College of Engineering",
    quote: "It was really good, mentors helped to complete our task.",
  },
  {
    name: "Student",
    college: "K. Ramakrishnan College of Engineering",
    quote:
      "The event was so good and juries helped to improve our project, coordinators were so helpful everytime.",
  },
  {
    name: "Keval",
    college: "Maharashtra, SRM",
    quote:
      "I got to know about this hackathon through SRM College. This college has a very good reputation. MKCE College's hospitality was excellent, and the surroundings here are very good as well.",
  },
  {
    name: "Sumit",
    college: "West Bengal, SRM",
    quote:
      "I came here to attend the hackathon, and I really liked the environment. The competition was strong, and there was a lot to learn from this experience.",
  },
];

// Testimonial Card Component - Compact version for side panel
const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    className="bg-white rounded-xl p-5"
    style={{
      boxShadow:
        "0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
      border: "1px solid rgba(0, 0, 0, 0.04)",
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 * index, duration: 0.4 }}
    whileHover={{
      y: -3,
      boxShadow:
        "0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)",
    }}
  >
    {/* Quote Icon */}
    <div className="mb-3" style={{ color: "#C9A227", opacity: 0.6 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
      </svg>
    </div>

    {/* Quote Text */}
    <p
      className="text-sm leading-relaxed mb-4"
      style={{
        color: "#374151",
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1.6,
      }}
    >
      {testimonial.quote}
    </p>

    {/* Author Info */}
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #C9A227 0%, #D4AF37 100%)",
        }}
      >
        <span className="text-white font-semibold text-xs">
          {testimonial.name.charAt(0)}
        </span>
      </div>
      <div>
        <p className="font-semibold text-xs" style={{ color: "#1F2937" }}>
          {testimonial.name}
        </p>
        <p className="text-xs" style={{ color: "#6B7280", fontSize: "10px" }}>
          {testimonial.college}
        </p>
      </div>
    </div>
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
        background: "#FAFAFA",
      }}
    >
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              background: "rgba(201, 162, 39, 0.1)",
              color: "#B8860B",
              border: "1px solid rgba(201, 162, 39, 0.2)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Registration Open
          </motion.span>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#1F2937",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to Participate?
          </h2>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{
              color: "#6B7280",
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.6,
            }}
          >
            Join hundreds of innovators at HACKFEST 2K26. Scan the QR code or
            click to register and be part of something extraordinary.
          </p>
        </motion.div>

        {/* Two Column Layout: QR + Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* QR Code Section */}
          <motion.div
            className="flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.a
              href={qrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block no-underline"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="bg-white rounded-3xl p-8 md:p-12"
                style={{
                  boxShadow:
                    "0 8px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                  border: "1px solid rgba(201, 162, 39, 0.15)",
                }}
              >
                {/* QR Code Container */}
                <div
                  className="rounded-2xl overflow-hidden mb-8"
                  style={{
                    width: "320px",
                    height: "320px",
                    background: "#FFFFFF",
                    border: "2px solid #E5E7EB",
                    padding: "12px",
                  }}
                >
                  <img
                    src={qrImage}
                    alt="QR Code - Scan to Register"
                    className="w-full h-full object-contain"
                    style={{
                      imageRendering: "crisp-edges",
                      filter: "contrast(1.1)",
                    }}
                  />
                </div>

                {/* CTA Text */}
                <div className="text-center">
                  <p
                    className="text-xs uppercase tracking-widest font-semibold mb-2"
                    style={{ color: "#9CA3AF" }}
                  >
                    Scan or Click to Register
                  </p>
                  <p
                    className="text-xl md:text-2xl font-bold flex items-center justify-center gap-2"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#1F2937",
                    }}
                  >
                    Join HACKFEST 2K26
                    <span style={{ color: "#C9A227" }}>→</span>
                  </p>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Testimonials Section - Right Side */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Testimonials Header */}
            <div className="mb-6">
              <h3
                className="text-xl md:text-2xl font-bold mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#1F2937",
                }}
              >
                Hear from Participants
              </h3>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                Students who experienced HACKFEST
              </p>
            </div>

            {/* Testimonials Grid - 2x2 compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href={qrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg no-underline"
            style={{
              background: "linear-gradient(135deg, #1F2937 0%, #374151 100%)",
              color: "#FFFFFF",
              boxShadow: "0 4px 20px rgba(31, 41, 55, 0.25)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 32px rgba(31, 41, 55, 0.35)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Register Now
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>

          <p className="mt-4 text-sm" style={{ color: "#9CA3AF" }}>
            Limited spots available • Registration closes soon
          </p>
        </motion.div>
      </div>

      {/* Subtle Gradient Accent at Top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.3), transparent)",
        }}
      />
    </section>
  );
}
