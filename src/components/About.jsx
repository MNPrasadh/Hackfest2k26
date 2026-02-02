import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { Plus, Minus } from "lucide-react";
import firstP from "../image/first-p.png";

const faqData = [
  {
    question: "What is HACKFEST 2K26?",
    answer:
      "HACKFEST 2K26 is a 36-hour national-level hackathon hosted by the Department of AI, CSE, IT, CSBS & MCA at M. Kumarasamy College of Engineering, Karur. It's an epic event calling all tech wizards and innovation enthusiasts to build groundbreaking solutions!",
  },
  {
    question: "When and where is the hackathon?",
    answer:
      "The hackathon runs from Feb 20th, 9:00 AM to Feb 21st, 9:00 PM, 2026 at M. Kumarasamy College of Engineering, Karur. Registration deadline is Feb 12, 2026 - secure your spot before it's too late!",
  },
  {
    question: "Who can participate?",
    answer:
      "Open to all undergraduate and postgraduate students across various disciplines! Form a team of up to 4 members (teamwork makes the dream work!) and get ready for an amazing coding marathon.",
  },
  {
    question: "What are the prizes?",
    answer:
      "Amazing prizes worth ₹1,15,000 INR await the winners! Along with cash prizes, you'll get goodies, certificates, and a chance to network with industry experts and mentors.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring your own equipment (laptops, chargers, etc.) and be prepared for a 36-hour coding marathon! Commitment to the entire duration is crucial. Stay energized and ready to innovate!",
  },
  {
    question: "What are the rules?",
    answer:
      "Remember, plagiarism is a strict no-go! All code must be original and created during the hackathon. Teams must commit to the full 36 hours. Register now and be part of something groundbreaking!",
  },
];

function FAQItem({ item, isOpen, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b border-white/8"
    >
      <button
        onClick={onClick}
        className="w-full text-left py-2.5 flex items-start justify-between gap-3 group"
      >
        <div className="flex items-start gap-3">
          <span
            className="text-xs font-mono mt-0.5"
            style={{ color: "#7A1E2D" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-white font-medium text-base group-hover:text-gray-300 transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {item.question}
          </span>
        </div>
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? "#7A1E2D" : "rgba(255,255,255,0.08)",
          }}
        >
          {isOpen ? (
            <Minus className="w-3 h-3 text-white" />
          ) : (
            <Plus className="w-3 h-3 text-white" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm leading-relaxed pl-9 pb-3">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects for different elements
  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <motion.section
      ref={ref}
      id="about"
      className="relative overflow-hidden"
      style={{ background: "#0B0B0B" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Header Section */}
        <Row className="mb-6">
          <Col lg={8}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ y: contentY }}
            >
              <span className="inline-block px-3 py-1.5 rounded-full bg-white/8 text-gray-400 font-semibold text-xs tracking-wider uppercase mb-3">
                About The Event
              </span>

              <h2
                className="font-bold text-white mb-1 leading-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                }}
              >
                Got Questions?
              </h2>
              <h2
                className="font-bold mb-0 leading-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#7A1E2D",
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                }}
              >
                We've Got Answers.
              </h2>
            </motion.div>
          </Col>
        </Row>

        <Row className="align-items-start g-4">
          {/* Left - FAQ Content (wider) */}
          <Col lg={7}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* FAQ Accordion */}
              <div className="border-t border-white/10">
                {faqData.map((item, index) => (
                  <FAQItem
                    key={index}
                    item={item}
                    index={index}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                  />
                ))}
              </div>
            </motion.div>
          </Col>

          {/* Right - Image with Parallax */}
          <Col lg={5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
              style={{ y: imageY }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              >
                <img
                  src={firstP}
                  alt="Hackathon"
                  className="w-full"
                  style={{
                    height: "auto",
                    maxHeight: "360px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Tagline below image */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-5 text-left"
              >
                <h3
                  className="leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <div
                    className="font-black text-white"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
                  >
                    BUILD. COLLABORATE.
                  </div>
                  <div
                    className="font-black text-gray-500 mt-1"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
                  >
                    CREATE IMPACT.
                  </div>
                </h3>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </motion.section>
  );
}
