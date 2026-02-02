import React, { useState } from "react";
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
  const navigate = useNavigate();

  const handleClick = (e, href, isInternal) => {
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
            const Component = item.isInternal ? motion.div : motion(Link);
            const componentProps = item.isInternal
              ? {
                  onClick: (e) => handleClick(e, item.href, item.isInternal),
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
                  const Component = item.isInternal ? motion.div : motion(Link);
                  const componentProps = item.isInternal
                    ? {
                        onClick: (e) =>
                          handleClick(e, item.href, item.isInternal),
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
