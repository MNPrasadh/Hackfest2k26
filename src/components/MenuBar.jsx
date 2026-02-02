import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Home, Clock, Calendar, Mail, Menu, X } from "lucide-react";

const menuItems = [
  {
    icon: <Home size={18} />,
    label: "HACKFEST2K26",
    href: "/",
    isInternal: true,
  },
  {
    icon: <Clock size={18} />,
    label: "Timeline",
    href: "/#timeline",
    isInternal: true,
  },
  {
    icon: <Calendar size={18} />,
    label: "Event Details",
    href: "/event-details",
    isInternal: false,
    isModal: true,
  },
  {
    icon: <Mail size={18} />,
    label: "Contact Us",
    href: "/#footer",
    isInternal: true,
  },
];

function MenuBar({ isCollapsed }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEventDetailsOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    return undefined;
  }, [isEventDetailsOpen]);

  const handleClick = (e, href, isInternal, isModal) => {
    if (isModal) {
      e.preventDefault();
      setIsEventDetailsOpen(true);
      setIsMobileMenuOpen(false);
      return;
    }
    if (isInternal) {
      if (href === "/") {
        navigate("/");
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
      } else if (href.includes("#")) {
        e.preventDefault();
        const id = href.substring(href.indexOf("#") + 1);
        if (window.location.pathname !== "/") {
          navigate("/");
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
      }
      setIsMobileMenuOpen(false);
    } else {
      // For external navigation, let React Router handle it
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Expanded Menu */}
      {!isCollapsed && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "8px 12px",
            borderRadius: "16px",
            backgroundColor: "rgba(10, 10, 10, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            marginLeft: "48px", // Move menu bar more to the right
          }}
        >
          {menuItems.map((item, index) => {
            const Component = item.isModal
              ? motion.button
              : item.isInternal
                ? motion.div
                : motion(Link);
            const componentProps = item.isModal
              ? {
                  onClick: (e) =>
                    handleClick(e, item.href, item.isInternal, item.isModal),
                  type: "button",
                  style: { cursor: "pointer" },
                }
              : item.isInternal
                ? {
                    onClick: (e) =>
                      handleClick(e, item.href, item.isInternal, item.isModal),
                    style: { cursor: "pointer" },
                  }
                : {
                    to: item.href,
                    style: { textDecoration: "none" },
                  };

            return (
              <Component
                key={item.label}
                {...componentProps}
                className="menu-item"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </Component>
            );
          })}
        </motion.nav>
      )}

      {/* Collapsed Menu Button */}
      {isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "relative",
          }}
        >
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "rgba(10, 10, 10, 0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.7)",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </motion.button>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  top: "54px",
                  right: 0,
                  backgroundColor: "rgba(10, 10, 10, 0.98)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "8px",
                  minWidth: "200px",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.8)",
                  zIndex: 2000,
                  pointerEvents: "auto",
                }}
              >
                {menuItems.map((item, index) => {
                  const Component = item.isModal
                    ? motion.button
                    : item.isInternal
                      ? motion.div
                      : motion(Link);
                  const componentProps = item.isModal
                    ? {
                        onClick: (e) =>
                          handleClick(
                            e,
                            item.href,
                            item.isInternal,
                            item.isModal,
                          ),
                        type: "button",
                        style: { cursor: "pointer" },
                      }
                    : item.isInternal
                      ? {
                          onClick: (e) =>
                            handleClick(
                              e,
                              item.href,
                              item.isInternal,
                              item.isModal,
                            ),
                          style: { cursor: "pointer" },
                        }
                      : {
                          to: item.href,
                          style: { textDecoration: "none" },
                        };

                  return (
                    <Component
                      key={item.label}
                      {...componentProps}
                      className="mobile-menu-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{
                        x: 4,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                      style={{
                        ...componentProps.style,
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        color: "rgba(255, 255, 255, 0.6)",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Component>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Event Details Modal */}
      <AnimatePresence>
        {isEventDetailsOpen && (
          <motion.div
            className="event-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEventDetailsOpen(false)}
          >
            <motion.div
              className="event-modal"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-label="Event Guidelines"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="event-modal-header">
                <div>
                  <p className="event-modal-eyebrow">Event Details</p>
                  <h3 className="event-modal-title">Event Guidelines</h3>
                </div>
                <button
                  type="button"
                  className="event-modal-close"
                  onClick={() => setIsEventDetailsOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="event-modal-content">
                <div className="event-section">
                  <h4>Participation</h4>
                  <ul>
                    <li>Hardware and software solutions are welcome.</li>
                    <li>Teams must consist of 3–4 participants.</li>
                  </ul>
                </div>

                <div className="event-section">
                  <h4>Registration</h4>
                  <ul>
                    <li>
                      Registration is confirmed only after successful payment.
                    </li>
                    <li>The participation fee is ₹3,000 per team.</li>
                  </ul>
                </div>

                <div className="event-section">
                  <h4>Build Policy</h4>
                  <ul>
                    <li>
                      All projects must be built exclusively during the event.
                    </li>
                    <li>
                      Pre-built or previously submitted work is not permitted.
                    </li>
                    <li>
                      Problem statements must align strictly with the assigned
                      domains.
                    </li>
                  </ul>
                </div>

                <div className="event-section">
                  <h4>Integrity</h4>
                  <ul>
                    <li>Original work is mandatory.</li>
                    <li>
                      Plagiarism or policy violations will result in immediate
                      disqualification.
                    </li>
                    <li>
                      All participants are expected to maintain professional
                      conduct throughout the event.
                    </li>
                  </ul>
                </div>

                <div className="event-section">
                  <h4>Evaluation</h4>
                  <ul>
                    <li>
                      All submissions will be reviewed by an expert jury panel.
                    </li>
                    <li>The jury’s decision is final and non-negotiable.</li>
                  </ul>
                </div>

                <div className="event-section">
                  <h4>Compliance</h4>
                  <ul>
                    <li>
                      Participants must adhere to all institutional rules and
                      regulations at all times.
                    </li>
                  </ul>
                </div>

                <div className="event-section">
                  <h4>Experience & Facilities</h4>
                  <ul>
                    <li>Comfortable accommodation will be provided.</li>
                    <li>
                      High-speed internet access will be available throughout
                      the event.
                    </li>
                    <li>
                      Official college transportation may be utilized as
                      scheduled.
                    </li>
                    <li>
                      Participants are advised to carry all personal and project
                      essentials.
                    </li>
                  </ul>
                </div>

                <div className="event-section">
                  <h4>What’s Included</h4>
                  <ul>
                    <li>Curated event swags and official T-shirts.</li>
                    <li>Complimentary meals during the event.</li>
                    <li>An exclusive DJ Night on Day 1.</li>
                  </ul>
                </div>

                <div className="event-section">
                  <h4>Support</h4>
                  <ul>
                    <li>
                      Dedicated student and staff coordinators will be available
                      24×7 to assist participants.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .menu-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          border-radius: 10px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .menu-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-item {
          transition: all 0.2s ease;
        }

        .mobile-menu-item:hover {
          color: #FFFFFF !important;
        }

        .menu-icon {
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }

        .event-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(6px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .event-modal {
          width: min(920px, 100%);
          max-height: 85vh;
          overflow: hidden;
          background: rgba(12, 12, 12, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .event-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
          position: sticky;
          top: 0;
          background: rgba(12, 12, 12, 0.95);
          padding-bottom: 12px;
          z-index: 2;
        }

        .event-modal-eyebrow {
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(34, 197, 94, 0.7);
          margin: 0 0 6px 0;
        }

        .event-modal-title {
          margin: 0;
          font-size: 1.6rem;
          color: #fff;
        }

        .event-modal-close {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .event-modal-content {
          overflow: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          padding-right: 6px;
          max-height: calc(85vh - 110px);
        }

        .event-modal-content::-webkit-scrollbar {
          width: 8px;
        }

        .event-modal-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
        }

        .event-modal-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .event-section {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 14px 16px;
        }

        .event-section h4 {
          margin: 0 0 8px 0;
          font-size: 1rem;
          color: #fff;
        }

        .event-section ul {
          margin: 0;
          padding-left: 18px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .menu-label {
            display: none;
          }
          .menu-item {
            padding: 10px 12px;
          }
        }

        @media (max-width: 500px) {
          .menu-item {
            padding: 8px 8px;
          }
        }
      `}</style>
    </>
  );
}

export default MenuBar;
