import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import sdg3 from "../image/sdg 3.png";
import sdg4 from "../image/sdg 4.png";
import sdg9 from "../image/sdg 9.png";
import sdg11 from "../image/sdg 11.png";
import sdg13 from "../image/sdg 13.png";

const domains = [
  {
    id: "03",
    title: "Good Health & Well-being",
    sdg: "SDG 3",
    image: sdg3,
    desc: "Healthcare & Wellness Solutions",
    hoverColor: "rgba(34,197,94,0.6)",
    modal: {
      description:
        "Ensure healthy lives and promote well-being for all at all ages. Focuses on reducing mortality, improving healthcare access, and promoting mental health.",
      focus: [
        "Universal health coverage & access",
        "Reduce maternal & child mortality",
        "Promote mental health & well-being",
      ],
    },
  },
  {
    id: "04",
    title: "Quality Education",
    sdg: "SDG 4",
    image: sdg4,
    desc: "EdTech & Learning Platforms",
    hoverColor: "rgba(239,68,68,0.6)",
    modal: {
      description:
        "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Emphasizes literacy, skills, and equal access.",
      focus: [
        "Universal primary & secondary education",
        "Eliminate gender disparities",
        "Promote lifelong learning",
      ],
    },
  },
  {
    id: "09",
    title: "Industry & Innovation",
    sdg: "SDG 9",
    image: sdg9,
    desc: "Industrial Automation & AI",
    hoverColor: "rgba(249,115,22,0.6)",
    modal: {
      description:
        "Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation. Encourages sustainable industry and technology.",
      focus: [
        "Upgrade infrastructure & industries",
        "Promote sustainable innovation",
        "Increase access to technology",
      ],
    },
  },
  {
    id: "11",
    title: "Sustainable Cities",
    sdg: "SDG 11",
    image: sdg11,
    desc: "Smart City Technologies",
    hoverColor: "rgba(234,179,8,0.7)",
    modal: {
      description:
        "Make cities and human settlements inclusive, safe, resilient, and sustainable. Focuses on housing, transport, and green spaces.",
      focus: [
        "Affordable & safe housing",
        "Sustainable urban transport",
        "Access to green public spaces",
      ],
    },
  },
  {
    id: "13",
    title: "Climate Action",
    sdg: "SDG 13",
    image: sdg13,
    desc: "Environmental Tech Solutions",
    hoverColor: "rgba(34,197,94,0.6)",
    modal: {
      description:
        "Take urgent action to combat climate change and its impacts. Focuses on resilience, education, and reducing emissions.",
      focus: [
        "Strengthen resilience to climate hazards",
        "Integrate climate measures in policy",
        "Promote climate education & awareness",
      ],
    },
  },
];

// SDG Modal Component
function SDGModal({ domain, onClose }) {
  // Close on ESC or click outside
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Prevent scroll when modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          background: "rgba(10,10,15,0.75)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      >
        <motion.div
          className="relative rounded-2xl p-6 w-full"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            maxWidth: "480px",
            background: "linear-gradient(180deg, #111 0%, #0B0B0B 100%)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 60px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "auto",
            overflow: "auto",
            maxHeight: "85vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 text-xl font-bold focus:outline-none transition-colors"
            aria-label="Close"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            ×
          </button>
          {/* SDG Icon and Badge */}
          <div className="flex flex-col items-center mb-3">
            <img
              src={domain.image}
              alt={domain.sdg}
              className="w-16 h-16 rounded-xl mb-2"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}
            />
            <span
              className="inline-block px-3 py-0.5 rounded-full bg-gray-800 text-gray-300 text-xs font-semibold"
              style={{ letterSpacing: "0.05em" }}
            >
              {domain.sdg}
            </span>
          </div>
          {/* Title */}
          <h3
            className="text-xl font-bold text-center mb-2 text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {domain.title}
          </h3>
          {/* Description */}
          <p className="text-gray-400 text-center mb-3 text-sm leading-relaxed">
            {domain.modal.description}
          </p>
          {/* Focus Points */}
          <ul
            className="text-gray-300 mb-0 pl-5 text-sm"
            style={{ listStyle: "disc" }}
          >
            {domain.modal.focus.map((point, i) => (
              <li key={i} className="mb-1">
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Themes() {
  const ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const [modalDomain, setModalDomain] = useState(null);

  // Subtle parallax scroll tracking (5-8%)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle parallax effect for cards (6%)
  const cardsX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  // Convert vertical mouse wheel to horizontal scroll
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      // Only intercept if we're hovering over the cards area
      const containerRect = scrollContainer.getBoundingClientRect();
      const isInContainer =
        e.clientY >= containerRect.top && e.clientY <= containerRect.bottom;

      if (isInContainer) {
        // Check if we can scroll horizontally
        const canScrollLeft = scrollContainer.scrollLeft > 0;
        const canScrollRight =
          scrollContainer.scrollLeft <
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        // If scrolling down and can scroll right, or scrolling up and can scroll left
        if (
          (e.deltaY > 0 && canScrollRight) ||
          (e.deltaY < 0 && canScrollLeft)
        ) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY * 1.5;
        }
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);

  // Modal open/close handlers
  const openModal = useCallback((domain) => setModalDomain(domain), []);
  const closeModal = useCallback(() => setModalDomain(null), []);

  return (
    <motion.section
      ref={ref}
      id="themes"
      className="relative overflow-hidden flex-shrink-0"
      style={{
        background:
          "radial-gradient(100% 100% at 50% 0%, #0f0f0f 0%, #0B0B0B 50%, #080808 100%)",
        width: "100vw",
        minHeight: "auto",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Ambient glow - softer */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Container with max-width limit */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Header - Compact */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-gray-200 font-semibold text-xs tracking-wider uppercase mb-3"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(255,255,255,0.05))",
              border: "1px solid rgba(34,197,94,0.25)",
              boxShadow: "0 0 20px rgba(34,197,94,0.08)",
            }}
          >
            Problem Statements
          </span>
          <h2
            className="font-bold text-white"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            }}
          >
            Hackathon Domains
          </h2>
          <p className="text-gray-400 mt-2 max-w-md mx-auto text-sm">
            Choose your challenge aligned with UN Sustainable Development Goals
          </p>
        </motion.div>

        {/* Domain Cards - Horizontal Parallax Scroll */}
        <div className="relative">
          {/* Scroll hint gradient - left */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #0B0B0B 0%, transparent 100%)",
            }}
          />
          {/* Scroll hint gradient - right */}
          <div
            className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(270deg, #0B0B0B 0%, transparent 100%)",
            }}
          />

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 px-4 scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <motion.div
              className="flex gap-5 items-stretch"
              style={{
                x: cardsX,
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              {domains.map((domain, index) => (
                <div
                  key={domain.id}
                  className="w-[280px] sm:w-[300px] lg:w-[320px] flex-shrink-0"
                >
                  <DomainCard
                    domain={domain}
                    index={index}
                    onClick={() => openModal(domain)}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-4 gap-2">
            <span className="text-gray-500 text-xs uppercase tracking-wider flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Scroll to explore
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* SDG Modal Popup */}
      {modalDomain && <SDGModal domain={modalDomain} onClose={closeModal} />}
    </motion.section>
  );
}

function DomainCard({ domain, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="p-5 rounded-2xl text-center cursor-pointer h-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          backdropFilter: "blur(8px)",
        }}
        whileHover={{
          y: -4,
          boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 30px ${domain.hoverColor.replace("0.6", "0.15").replace("0.7", "0.15")}`,
          borderColor: domain.hoverColor,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`Open details for ${domain.title}`}
      >
        {/* SDG Image - Smaller */}
        <motion.div
          className="mx-auto mb-3 rounded-xl overflow-hidden"
          style={{
            width: "64px",
            height: "64px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <img
            src={domain.image}
            alt={domain.sdg}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Badge - Smaller */}
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold mb-2"
          style={{
            color: "rgba(255,255,255,0.75)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {domain.sdg}
        </span>

        {/* Title - Compact */}
        <h4
          className="font-bold text-white text-base mb-1.5"
          style={{ letterSpacing: "-0.01em", lineHeight: 1.3 }}
        >
          {domain.title}
        </h4>

        {/* Description */}
        <p className="text-gray-400 text-xs mb-0 leading-relaxed">
          {domain.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}
