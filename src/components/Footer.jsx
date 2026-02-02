import React from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.766165!2d78.04844154399788!3d11.05432857905236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2f8cafec7c95%3A0xa3459e9bc37d5a!2sM.%20Kumarasamy%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1706500000000!5m2!1sen!2sin&markers=color:red%7Clabel:MKCE%7C11.05432857905236,78.04844154399788";

  const locationLink =
    "https://maps.google.com/?q=M.+Kumarasamy+College+of+Engineering,+Karur";

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Domains", href: "#themes" },
    { name: "Prizes", href: "#prizes" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.footer
      id="footer"
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 120% at 50% 0%, #121212 0%, #0A0A0A 55%, #080808 100%)",
      }}
      initial={{ opacity: 0, y: 100, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Ambient glow layers */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute bottom-0 right-[-120px] w-[520px] h-[260px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <Container className="relative z-10 py-20 px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span
            className="inline-block px-5 py-2 rounded-full text-gray-200 font-semibold text-sm tracking-wider uppercase mb-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(255,255,255,0.08))",
              border: "1px solid rgba(34,197,94,0.35)",
              boxShadow: "0 0 30px rgba(34,197,94,0.15)",
            }}
          >
            Get In Touch
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold text-white"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Contact Us
          </h2>
        </motion.div>

        <Row className="g-5 align-items-stretch">
          {/* Map */}
          <Col lg={7} className="d-flex">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex-grow-1 d-flex"
            >
              <div
                className="rounded-2xl overflow-hidden relative flex-grow-1"
                style={{
                  minHeight: "360px",
                  height: "100%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                }}
              >
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="MKCE Location"
                />
                {/* Location Card Overlay */}
                <motion.a
                  href={locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 flex items-center gap-3 p-4 rounded-xl no-underline text-white hover:text-gray-200 transition-all"
                  style={{
                    background: "rgba(8, 8, 8, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(12px)",
                    maxWidth: "280px",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                  }}
                  whileHover={{
                    scale: 1.04,
                    borderColor: "rgba(34,197,94,0.5)",
                  }}
                >
                  <span className="text-2xl">📍</span>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm mb-0">
                      M. Kumarasamy College of Engineering
                    </p>
                    <p className="text-gray-400 text-xs mb-0">
                      Thalavapalayam, Karur
                    </p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </Col>

          {/* Contact Info */}
          <Col lg={5} className="d-flex">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="h-100 d-flex flex-column gap-4 flex-grow-1"
            >
              {/* Email Card */}
              <motion.div
                className="p-6 rounded-2xl flex-grow-1"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                }}
                whileHover={{ borderColor: "rgba(34,197,94,0.4)" }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-2">
                      Contact
                    </p>
                    <h3 className="text-white text-xl font-semibold mb-0">
                      Email & Phone
                    </h3>
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(255,255,255,0.08))",
                      border: "1px solid rgba(34,197,94,0.4)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                    }}
                  >
                    <span className="text-lg">✉️</span>
                  </div>
                </div>

                <div
                  className="h-px w-full mb-5"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(34,197,94,0.6), transparent)",
                  }}
                />

                <div className="mb-4">
                  <p className="text-gray-500 text-sm mb-2">Email Us</p>
                  <a
                    href="mailto:hackfest2k26@mkce.ac.in"
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-lg no-underline"
                    style={{
                      color: "#FFFFFF",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                    }}
                  >
                    <span className="text-sm">hackfest2k26@mkce.ac.in</span>
                    <span className="text-sm text-gray-400">→</span>
                  </a>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500 text-sm mb-2">Call Us</p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="tel:+917305386217"
                      className="inline-flex items-center justify-between gap-3 px-4 py-2 rounded-lg no-underline"
                      style={{
                        color: "#FFFFFF",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                      }}
                    >
                      <span className="text-sm">
                        PRASADH M N
                        <span className="text-gray-400">
                          {" "}
                          · Student Coordinator
                        </span>
                      </span>
                      <span className="text-sm text-gray-300">73053 86217</span>
                    </a>
                    <a
                      href="tel:+918438207452"
                      className="inline-flex items-center justify-between gap-3 px-4 py-2 rounded-lg no-underline"
                      style={{
                        color: "#FFFFFF",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                      }}
                    >
                      <span className="text-sm">
                        ANURAAG RAI S
                        <span className="text-gray-400">
                          {" "}
                          · Student Coordinator
                        </span>
                      </span>
                      <span className="text-sm text-gray-300">84382 07452</span>
                    </a>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-0">
                  We typically respond within 24 hours
                </p>
              </motion.div>

              {/* How to reach MKCE Card */}
              <motion.div
                className="p-6 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                }}
                whileHover={{ borderColor: "rgba(34,197,94,0.4)" }}
              >
                <div
                  className="h-[3px] w-12 rounded-full mb-4"
                  style={{
                    background: "linear-gradient(90deg, #22C55E, transparent)",
                  }}
                />
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎓</span>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0">
                    Reach MKCE
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-white text-sm leading-relaxed">
                      From Paramathi Velur, board Local Bus No. 1 and alight at MKCE.
From Karur Bus Stand, board Bus No. 1 and alight at MKCE.
                      
                    </p>
                  </div>
                  <div>
                    <p className="text-white text-sm">
                      <span className="font-medium">Own vehicle:</span> Search
                      "M. Kumarasamy College of Engineering" on Google Maps.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Col>
        </Row>

        {/* Footer Bottom removed as requested */}
      </Container>
    </motion.footer>
  );
}
