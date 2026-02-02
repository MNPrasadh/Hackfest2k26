import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import sdg3 from '../image/sdg 3.png';
import sdg4 from '../image/sdg 4.png';
import sdg9 from '../image/sdg 9.png';
import sdg11 from '../image/sdg 11.png';
import sdg13 from '../image/sdg 13.png';


const domains = [
    {
        id: "03",
        title: "Good Health & Well-being",
        sdg: "SDG 3",
        image: sdg3,
        desc: "Healthcare & Wellness Solutions",
        modal: {
            description: "Ensure healthy lives and promote well-being for all at all ages. Focuses on reducing mortality, improving healthcare access, and promoting mental health.",
            focus: [
                "Universal health coverage & access",
                "Reduce maternal & child mortality",
                "Promote mental health & well-being"
            ]
        }
    },
    {
        id: "04",
        title: "Quality Education",
        sdg: "SDG 4",
        image: sdg4,
        desc: "EdTech & Learning Platforms",
        modal: {
            description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Emphasizes literacy, skills, and equal access.",
            focus: [
                "Universal primary & secondary education",
                "Eliminate gender disparities",
                "Promote lifelong learning"
            ]
        }
    },
    {
        id: "09",
        title: "Industry & Innovation",
        sdg: "SDG 9",
        image: sdg9,
        desc: "Industrial Automation & AI",
        modal: {
            description: "Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation. Encourages sustainable industry and technology.",
            focus: [
                "Upgrade infrastructure & industries",
                "Promote sustainable innovation",
                "Increase access to technology"
            ]
        }
    },
    {
        id: "11",
        title: "Sustainable Cities",
        sdg: "SDG 11",
        image: sdg11,
        desc: "Smart City Technologies",
        modal: {
            description: "Make cities and human settlements inclusive, safe, resilient, and sustainable. Focuses on housing, transport, and green spaces.",
            focus: [
                "Affordable & safe housing",
                "Sustainable urban transport",
                "Access to green public spaces"
            ]
        }
    },
    {
        id: "13",
        title: "Climate Action",
        sdg: "SDG 13",
        image: sdg13,
        desc: "Environmental Tech Solutions",
        modal: {
            description: "Take urgent action to combat climate change and its impacts. Focuses on resilience, education, and reducing emissions.",
            focus: [
                "Strengthen resilience to climate hazards",
                "Integrate climate measures in policy",
                "Promote climate education & awareness"
            ]
        }
    }
];

// SDG Modal Component
import { useEffect } from 'react';


function SDGModal({ domain, onClose }) {
    // Close on ESC or click outside
    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    // Prevent scroll when modal open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ background: 'rgba(20,20,30,0.65)', backdropFilter: 'blur(2px)' }}
                onClick={onClose}
            >
                <motion.div
                    className="relative bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4"
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    style={{
                        maxWidth: '700px',
                        minWidth: '320px',
                        width: '100%',
                        background: '#0B0B0B',
                        boxShadow: '0 8px 48px rgba(0,0,0,0.18)',
                        border: '1.5px solid #222',
                        position: 'relative',
                        cursor: 'auto',
                        overflow: 'auto',
                        maxHeight: '90vh',
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-400 text-2xl font-bold focus:outline-none"
                        aria-label="Close"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        ×
                    </button>
                    {/* SDG Icon and Badge */}
                    <div className="flex flex-col items-center mb-4">
                        <img src={domain.image} alt={domain.sdg} className="w-20 h-20 rounded-xl mb-2 shadow-md" />
                        <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-semibold mb-2" style={{ letterSpacing: '0.05em' }}>{domain.sdg}</span>
                    </div>
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-center mb-2 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{domain.title}</h3>
                    {/* Description */}
                    <p className="text-gray-400 text-center mb-4" style={{ fontSize: '1.08rem' }}>{domain.modal.description}</p>
                    {/* Focus Points */}
                    <ul className="text-gray-300 mb-2 pl-5" style={{ listStyle: 'disc', fontSize: '1.01rem' }}>
                        {domain.modal.focus.map((point, i) => (
                            <li key={i} className="mb-1">{point}</li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function Themes() {
    const ref = useRef(null);
    const [modalDomain, setModalDomain] = useState(null);

    // Parallax scroll tracking
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    // Parallax effect for cards
    const cardsY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

    // Modal open/close handlers
    const openModal = useCallback((domain) => setModalDomain(domain), []);
    const closeModal = useCallback(() => setModalDomain(null), []);

    return (
        <motion.section
            ref={ref}
            id="themes"
            className="h-screen flex items-center relative overflow-hidden flex-shrink-0"
            style={{ background: '#0B0B0B', width: '100vw' }}
            initial={{ opacity: 0, y: 100, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Container className="relative z-10 py-20">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-gray-200 text-gray-600 font-semibold text-sm tracking-wider uppercase mb-4">
                        Problem Statements
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Hackathon Domains
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-lg mx-auto">
                        Choose your challenge aligned with UN Sustainable Development Goals
                    </p>
                </motion.div>

                {/* Domain Cards Grid with Parallax */}
                <motion.div style={{ y: cardsY }}>
                <Row className="g-4 justify-content-center">
                    {/* First row - 3 cards */}
                    {domains.slice(0, 3).map((domain, index) => (
                        <Col key={domain.id} xs={12} sm={6} lg={4}>
                            <DomainCard domain={domain} index={index} onClick={() => openModal(domain)} />
                        </Col>
                    ))}
                </Row>
                <Row className="g-4 justify-content-center mt-2">
                    {/* Second row - 2 centered cards */}
                    {domains.slice(3).map((domain, index) => (
                        <Col key={domain.id} xs={12} sm={6} lg={4}>
                            <DomainCard domain={domain} index={index + 3} onClick={() => openModal(domain)} />
                        </Col>
                    ))}
                </Row>
                </motion.div>

                
            </Container>

            {/* SDG Modal Popup */}
            {modalDomain && (
                <SDGModal domain={modalDomain} onClose={closeModal} />
            )}
        </motion.section>
    );
}

function DomainCard({ domain, index, onClick }) {
    return (
        <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 40, rotateY: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
        >
            <motion.div
                className="h-full p-6 rounded-3xl bg-gray-900 text-center cursor-pointer"
                style={{
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                    border: '1px solid #eee'
                }}
                whileHover={{
                    y: -10,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                    scale: 1.02
                }}
                transition={{ duration: 0.3 }}
                onClick={onClick}
                tabIndex={0}
                role="button"
                aria-label={`Open details for ${domain.title}`}
            >
                {/* SDG Image */}
                <motion.div
                    className="mx-auto mb-4 rounded-2xl overflow-hidden"
                    style={{
                        width: '80px',
                        height: '80px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                    }}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={domain.image} alt={domain.sdg} className="w-full h-full object-cover" />
                </motion.div>

                {/* Badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold mb-3">
                    {domain.sdg}
                </span>

                {/* Title */}
                <h4 className="font-bold text-white text-lg mb-2">{domain.title}</h4>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-0">{domain.desc}</p>
            </motion.div>
        </motion.div>
    );
}
